import React from 'react';
import { IconProps } from './index';

export function ClockIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z"
        fill={props.color}
      />
      <path d="M8 4.5V8H11.5" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z"
        stroke={props.color}
        strokeMiterlimit="10"
      />
      <path d="M12.2426 1.63605L14.364 3.75737" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.63605 3.75737L3.75737 1.63605" stroke={props.color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
