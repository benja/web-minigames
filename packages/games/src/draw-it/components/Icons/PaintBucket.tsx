import React from 'react';
import { IconProps } from './index';

export function PaintBucketIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M17.0625 16.0781C17.0625 14.438 18.7031 12.7969 18.7031 12.7969C18.7031 12.7969 20.3438 14.438 20.3438 16.0781C20.3438 16.5132 20.1709 16.9305 19.8632 17.2382C19.5555 17.5459 19.1382 17.7188 18.7031 17.7188C18.268 17.7188 17.8507 17.5459 17.543 17.2382C17.2354 16.9305 17.0625 16.5132 17.0625 16.0781Z"
        fill={props.color}
      />
      <path
        d="M9.37971 2.76091L1.77654 10.3641C1.52026 10.6204 1.52026 11.0359 1.77654 11.2922L8.72346 18.2391C8.97974 18.4954 9.39526 18.4954 9.65154 18.2391L17.2547 10.6359C17.511 10.3796 17.511 9.96412 17.2547 9.70784L10.3078 2.76091C10.0515 2.50463 9.63599 2.50463 9.37971 2.76091Z"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5 11.1567C11.4061 11.1567 12.1406 10.4222 12.1406 9.51611C12.1406 8.61002 11.4061 7.87549 10.5 7.87549C9.59391 7.87549 8.85938 8.61002 8.85938 9.51611C8.85938 10.4222 9.59391 11.1567 10.5 11.1567Z"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.0625 16.0781C17.0625 14.438 18.7031 12.7969 18.7031 12.7969C18.7031 12.7969 20.3438 14.438 20.3438 16.0781C20.3438 16.5132 20.1709 16.9305 19.8632 17.2382C19.5555 17.5459 19.1382 17.7188 18.7031 17.7188C18.268 17.7188 17.8507 17.5459 17.543 17.2382C17.2354 16.9305 17.0625 16.5132 17.0625 16.0781Z"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.3399 8.35602L4.0899 3.10602"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
