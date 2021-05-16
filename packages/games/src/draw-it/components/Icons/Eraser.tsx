import React from 'react';
import { IconProps } from './index';

export function EraserIcon(props: IconProps) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M9.10797 17.7051H5.912L2.86959 14.6627C2.74771 14.5409 2.65104 14.3962 2.58508 14.2369C2.51912 14.0777 2.48517 13.907 2.48517 13.7347C2.48517 13.5623 2.51912 13.3916 2.58508 13.2324C2.65104 13.0732 2.74771 12.9285 2.86959 12.8066L7.50998 8.1662L13.0784 13.7347L9.10797 17.7051Z"
        fill={props.color}
      />
      <path
        d="M7.50998 8.1662L13.0784 13.7347"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.7188 17.7051H5.91199L2.86959 14.6627C2.74771 14.5408 2.65104 14.3961 2.58508 14.2368C2.51912 14.0776 2.48517 13.9069 2.48517 13.7346C2.48517 13.5622 2.51912 13.3915 2.58508 13.2323C2.65104 13.0731 2.74771 12.9284 2.86959 12.8065L12.1504 3.52572C12.3965 3.27958 12.7303 3.1413 13.0784 3.1413C13.4265 3.1413 13.7604 3.27958 14.0065 3.52572L17.7188 7.23803C17.8407 7.35991 17.9374 7.5046 18.0033 7.66384C18.0693 7.82308 18.1033 7.99375 18.1033 8.16611C18.1033 8.33847 18.0693 8.50914 18.0033 8.66838C17.9374 8.82762 17.8407 8.97231 17.7188 9.09419L9.10797 17.7051"
        stroke={props.color}
        stroke-width="1.3125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
