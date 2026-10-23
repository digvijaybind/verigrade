'use client';

/**
 * Quote-cart state.
 *
 * Persisted to localStorage so a buyer can browse phones on one page, laptops on
 * another, and still find one basket at checkout. The cart stores USD so the
 * same basket can be re-priced into any of the 12 market currencies when the
 * visitor switches country.
 *
 * Hydration matters here: the server renders an empty basket, so we only read
 * localStorage after mount and expose `hydrated`. Without that flag the header
 * count would flip from 0 to N and React would warn about a mismatch.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  clampQty,
  isPriceMode,
  lineKey,
  moqFor,
  type CartLine,
  type PriceMode,
} from '@/lib/commerce';

const STORAGE_KEY = 'verigrade.cart.v1';
const MAX_LINES = 60;
const MAX_QTY = 100000;

type Persisted = { version: 1; mode: PriceMode; lines: CartLine[] };

type CartContextValue = {
  lines: CartLine[];
  mode: PriceMode;
  hydrated: boolean;
  count: number;
  setMode: (mode: PriceMode) => void;
  add: (line: Omit<CartLine, 'key'>, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== 'object') return false;
  const l = value as Record<string, unknown>;
  const pricing = l.pricing as Record<string, unknown> | undefined;
  const band = (b: unknown) =>
    !!b &&
    typeof b === 'object' &&
    Number.isFinite((b as Record<string, unknown>).from as number) &&
    Number.isFinite((b as Record<string, unknown>).to as number);
  return (
    typeof l.key === 'string' &&
    typeof l.slug === 'string' &&
    typeof l.name === 'string' &&
    typeof l.grade === 'string' &&
    typeof l.storage === 'string' &&
    typeof l.variant === 'string' &&
    Number.isFinite(l.qty as number) &&
    (l.qty as number) > 0 &&
    !!pricing &&
    band(pricing.wholesale) &&
    band(pricing.retail)
  );
}

function readStored(): Persisted | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    const lines = Array.isArray(parsed.lines) ? parsed.lines.filter(isCartLine) : [];
    const mode: PriceMode = isPriceMode(String(parsed.mode)) ? (parsed.mode as PriceMode) : 'wholesale';
    return { version: 1, mode, lines: lines.slice(0, MAX_LINES) };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [mode, setModeState] = useState<PriceMode>('wholesale');
  const [hydrated, setHydrated] = useState(false);
  const skipWrite = useRef(true);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setLines(stored.lines);
      setModeState(stored.mode);
    }
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = readStored();
      if (next) {
        setLines(next.lines);
        setModeState(next.mode);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    // The first write after hydration is the load itself; skip it to avoid
    // clobbering a basket another tab wrote between mount and hydrate.
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    try {
      const payload: Persisted = { version: 1, mode, lines };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage full or blocked (private mode). The cart still works in memory.
    }
  }, [lines, mode, hydrated]);

  const add = useCallback((line: Omit<CartLine, 'key'>, qty: number) => {
    const key = lineKey(line.slug, line.grade, line.storage, line.variant);
    const safeQty = clampQty(qty, 1, MAX_QTY);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: clampQty(l.qty + safeQty, 1, MAX_QTY) } : l,
        );
      }
      if (prev.length >= MAX_LINES) return prev;
      return [...prev, { ...line, key, qty: safeQty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: clampQty(qty, 1, MAX_QTY) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const setMode = useCallback((next: PriceMode) => {
    setModeState(next);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    return { lines, mode, hydrated, count, setMode, add, setQty, remove, clear };
  }, [lines, mode, hydrated, setMode, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}

/** MOQ for the active mode, accounting for per-line overrides. */
export function useMoq(): (line?: Pick<CartLine, 'wholesaleMoq' | 'retailMoq'>) => number {
  const { mode } = useCart();
  return useCallback((line) => moqFor(mode, line), [mode]);
}
