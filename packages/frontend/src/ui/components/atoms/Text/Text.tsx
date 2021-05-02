import React from 'react';

interface TextProps {
  children: string;
  header?: boolean;
}
export function Text(props: TextProps) {
  if (props.header) {
    return <b>{props.children}</b>;
  } else {
    return <p>{props.children}</p>;
  }
}
