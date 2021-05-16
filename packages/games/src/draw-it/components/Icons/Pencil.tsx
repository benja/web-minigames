import { IconProps } from './index';

export function PencilIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M11.1562 5.25002L15.75 9.84377L17.911 7.68281C18.034 7.55974 18.1032 7.39282 18.1032 7.21877C18.1032 7.04472 18.034 6.8778 17.911 6.75473L14.2453 3.08906C14.1222 2.96599 13.9553 2.89685 13.7812 2.89685C13.6072 2.89685 13.4403 2.96599 13.3172 3.08906L11.1562 5.25002Z"
        fill={props.color}
      />
      <path
        d="M7.83306 17.6768L3.32298 13.1667"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.60317 17.7188H3.9375C3.76345 17.7188 3.59653 17.6496 3.47346 17.5266C3.35039 17.4035 3.28125 17.2366 3.28125 17.0625V13.3969C3.28125 13.3107 3.29822 13.2253 3.3312 13.1457C3.36418 13.0661 3.41252 12.9937 3.47346 12.9328L13.3172 3.08906C13.4403 2.96599 13.6072 2.89685 13.7812 2.89685C13.9553 2.89685 14.1222 2.96599 14.2453 3.08906L17.911 6.75473C18.034 6.8778 18.1032 7.04472 18.1032 7.21877C18.1032 7.39282 18.034 7.55974 17.911 7.68281L8.06721 17.5266C8.00627 17.5875 7.93393 17.6358 7.85431 17.6688C7.77469 17.7018 7.68935 17.7188 7.60317 17.7188Z"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.1562 5.25L15.75 9.84375"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
