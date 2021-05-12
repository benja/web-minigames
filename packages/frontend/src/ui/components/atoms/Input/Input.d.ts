interface InputProps {
    text: string;
    type?: 'text';
    placeholder?: string;
    onChange?: (text: string) => void;
}
export declare function Input(props: InputProps): JSX.Element;
export {};
