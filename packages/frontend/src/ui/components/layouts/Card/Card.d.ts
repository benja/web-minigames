import React from 'react';
interface CardProps {
    header?: string;
    subHeader?: string;
    children: React.ReactNode;
    onClick?: () => void;
}
export declare function Card(props: CardProps): JSX.Element;
export {};
