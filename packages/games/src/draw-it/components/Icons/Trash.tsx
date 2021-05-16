import { IconProps } from './index';

export function TrashIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M16.4059 4.59375V17.0625C16.4059 17.2365 16.3368 17.4035 16.2137 17.5265C16.0907 17.6496 15.9237 17.7188 15.7497 17.7188H5.24969C5.07565 17.7188 4.90873 17.6496 4.78566 17.5265C4.66259 17.4035 4.59344 17.2365 4.59344 17.0625V4.59375L16.4059 4.59375Z"
        fill={props.color}
      />
      <path
        d="M17.7184 4.59375L3.28094 4.59375"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.53125 8.53125V13.7812"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.4688 8.53125V13.7812"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.4059 4.59375V17.0625C16.4059 17.2365 16.3368 17.4035 16.2137 17.5265C16.0907 17.6496 15.9237 17.7188 15.7497 17.7188H5.24969C5.07565 17.7188 4.90873 17.6496 4.78566 17.5265C4.66259 17.4035 4.59344 17.2365 4.59344 17.0625V4.59375"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.7812 4.59375V3.28125C13.7812 2.93315 13.643 2.59931 13.3968 2.35317C13.1507 2.10703 12.8168 1.96875 12.4688 1.96875H8.53125C8.18315 1.96875 7.84931 2.10703 7.60317 2.35317C7.35703 2.59931 7.21875 2.93315 7.21875 3.28125V4.59375"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
