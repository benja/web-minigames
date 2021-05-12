interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
}
export declare function Button(props: ButtonProps): JSX.Element;
export {};
