import React from 'react';
interface TextProps {
    children: React.ReactNode;
    tooltip?: string;
    header?: boolean;
    fontSize?: number;
    style?: React.CSSProperties;
}
export declare function Text(props: TextProps): JSX.Element;
export {};
