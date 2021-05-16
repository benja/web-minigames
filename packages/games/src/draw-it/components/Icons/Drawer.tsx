import React from 'react';
import { IconProps } from './index';

export function DrawerIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M16.8337 5.16638C16.0032 4.33628 15.0051 3.69302 13.9061 3.2796C12.807 2.86617 11.6324 2.69212 10.4608 2.76906C9.28907 2.846 8.14731 3.17217 7.11179 3.72576C6.07628 4.27935 5.17086 5.04761 4.45607 5.97919C3.74128 6.91076 3.23358 7.98419 2.96691 9.12771C2.70025 10.2712 2.68075 11.4585 2.90973 12.6102C3.13872 13.7618 3.6109 14.8513 4.29472 15.8059C4.97854 16.7604 5.85824 17.558 6.87503 18.1453V15.125L11 6.18751L15.125 15.125V18.1453C16.2208 17.5123 17.1563 16.6359 17.8592 15.5836C18.5621 14.5314 19.0136 13.3316 19.1788 12.077C19.3439 10.8224 19.2183 9.54666 18.8117 8.34836C18.4051 7.15006 17.7283 6.06134 16.8337 5.16638Z"
        fill="white"
      />
      <path
        d="M11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.44365 15.5563 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 15.5563 6.44365 19.25 11 19.25Z"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 15.8125C12.375 15.4478 12.5199 15.0981 12.7777 14.8402C13.0356 14.5824 13.3853 14.4375 13.75 14.4375C14.1147 14.4375 14.4644 14.5824 14.7223 14.8402C14.9801 15.0981 15.125 15.4478 15.125 15.8125"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 15.8125C6.875 15.4478 7.01987 15.0981 7.27773 14.8402C7.53559 14.5824 7.88533 14.4375 8.25 14.4375C8.61467 14.4375 8.96441 14.5824 9.22227 14.8402C9.48013 15.0981 9.625 15.4478 9.625 15.8125"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 19.1352V15.8125C12.375 15.4478 12.2301 15.0981 11.9723 14.8402C11.7144 14.5824 11.3647 14.4375 11 14.4375C10.6353 14.4375 10.2856 14.5824 10.0277 14.8402C9.76987 15.0981 9.625 15.4478 9.625 15.8125V19.1353"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.125 18.1466V15.125L11 6.1875L6.875 15.125V18.1469"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9039 10.3125H9.09616"
        stroke={props.color}
        strokeWidth="1.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
