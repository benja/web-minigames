import { IconProps } from './index';

export function ReportIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M8.5 14.875C12.0208 14.875 14.875 12.0208 14.875 8.5C14.875 4.97918 12.0208 2.125 8.5 2.125C4.97918 2.125 2.125 4.97918 2.125 8.5C2.125 12.0208 4.97918 14.875 8.5 14.875Z"
        fill={props.color}
      />
      <path
        d="M8.5 14.875C12.0208 14.875 14.875 12.0208 14.875 8.5C14.875 4.97918 12.0208 2.125 8.5 2.125C4.97918 2.125 2.125 4.97918 2.125 8.5C2.125 12.0208 4.97918 14.875 8.5 14.875Z"
        stroke={props.color}
        strokeWidth="1.0625"
        strokeMiterlimit="10"
      />
      <path
        d="M8.5 5.3125V9.03125"
        stroke={props.color}
        strokeWidth="1.0625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.2188C8.9401 12.2188 9.29688 11.862 9.29688 11.4219C9.29688 10.9818 8.9401 10.625 8.5 10.625C8.0599 10.625 7.70312 10.9818 7.70312 11.4219C7.70312 11.862 8.0599 12.2188 8.5 12.2188Z"
        fill={props.color}
      />
    </svg>
  );
}
