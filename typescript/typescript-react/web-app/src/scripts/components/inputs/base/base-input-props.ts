export interface BaseInputProps<T extends number | string> {
    id: string;
    isDisabled?: boolean;
    placeholder?: string;
    value?: T;
    onChange?: (val: T | undefined) => void;
    className?: string;
}
