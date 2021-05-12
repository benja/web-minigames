import { IconProp } from '@fortawesome/fontawesome-svg-core';
interface IconButtonProps {
    text: string;
    icon: IconProp;
    onClick?: () => void;
    onChange?: (text: string) => void;
    onSubmit?: () => void;
    iconTooltip?: string;
}
export declare function IconInput(props: IconButtonProps): JSX.Element;
export {};
