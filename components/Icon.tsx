import type { SVGProps } from 'react';

export type IconName =
  | 'clock'
  | 'shield'
  | 'award'
  | 'phone'
  | 'laptop'
  | 'parts'
  | 'check'
  | 'alert'
  | 'info'
  | 'close'
  | 'chevron'
  | 'mail'
  | 'tel'
  | 'whatsapp'
  | 'download'
  | 'search'
  | 'box'
  | 'truck'
  | 'balance'
  | 'lock'
  | 'file'
  | 'globe'
  | 'arrow'
  | 'battery'
  | 'chip'
  | 'recycle'
  | 'doc'
  | 'cart'
  | 'building'
  | 'plus'
  | 'minus';

const PATHS: Record<IconName, string> = {
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7.5V12l3 2',
  shield: 'M12 3l8 3.5v5c0 5-3.4 8.6-8 9.5-4.6-.9-8-4.5-8-9.5v-5L12 3zM9 12l2 2 4-4',
  award: 'M12 3.5a5 5 0 100 10 5 5 0 000-10zM8.5 12.5L7 21l5-2.5L17 21l-1.5-8.5',
  phone: 'M6.5 2.5h11a1.8 1.8 0 011.8 1.8v15.4a1.8 1.8 0 01-1.8 1.8h-11A1.8 1.8 0 014.7 19.7V4.3a1.8 1.8 0 011.8-1.8zM10.5 18.6h3',
  laptop: 'M3 4.5h18v11.5H3zM2 19.5h20M9 19.5v-1.4h6v1.4',
  parts: 'M14 3l7 7-4 4-7-7 4-4zM10 7L4 13l7 7 6-6',
  check: 'M4.5 12.5l5 5 10-11',
  alert: 'M12 3l9.5 16.5H2.5L12 3zM12 9.5v5M12 17.4v.1',
  info: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 11v6M12 7.4v.1',
  close: 'M5.5 5.5l13 13M18.5 5.5l-13 13',
  chevron: 'M6 9.5l6 6 6-6',
  mail: 'M3 5.5h18v13H3zM3 6.5l9 6.5 9-6.5',
  tel: 'M6 3.5h3.5l1.8 4.2-2.3 1.7a11 11 0 006.1 6.1l1.7-2.3 4.2 1.8V19a1.5 1.5 0 01-1.6 1.5C10.4 20.2 3.8 13.6 3.5 5.1A1.5 1.5 0 015 3.5z',
  whatsapp:
    'M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3zM9 8.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-1.3-1-1.3 1c-1-.4-1.9-1.3-2.3-2.3l1-1.3-1-1.3c-.5 0-1 .4-1 1z',
  download: 'M12 3.5v11M8 11l4 3.5 4-3.5M4 19.5h16',
  search: 'M11 3.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM16.5 16.5L21 21',
  box: 'M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4v-9zM3.5 7.5L12 11.5l8.5-4M12 11.5v9',
  truck: 'M2.5 6.5h11v10h-11zM13.5 9.5H17l3 3v4h-6.5zM7 20a2 2 0 100-4 2 2 0 000 4zM17.5 20a2 2 0 100-4 2 2 0 000 4z',
  balance: 'M12 3.5v17M6 7.5l-3 7h6zM18 7.5l-3 7h6zM4 7.5h16M8 20.5h8',
  lock: 'M5 10.5h14v10.5H5zM8 10.5V7a4 4 0 018 0v3.5',
  file: 'M6 3h8l4.5 4.5V21H6zM14 3v5h4.5M9 13h6M9 17h4',
  globe:
    'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z',
  arrow: 'M4.5 12h15M13.5 6l6 6-6 6',
  battery: 'M2.5 7.5h15v9h-15zM17.5 10.5h3v3h-3zM5 10.5v3h3v-3z',
  chip: 'M7 7h10v10H7zM9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3',
  recycle: 'M7.5 8.5L4 15h4M16.5 15.5L20 9h-4M9 20h6M12 3.5l2.5 4.5-2.5 4.5-2.5-4.5z',
  doc: 'M6 3h12v18H6zM9 7.5h6M9 11.5h6M9 15.5h3',
  cart: 'M3 4.5h2.5l2.2 10h10.6l2-7.5H6.5M9 19.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM16.5 19.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z',
  building: 'M4 21V5.5L12 3l8 2.5V21M4 21h16M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
};

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
