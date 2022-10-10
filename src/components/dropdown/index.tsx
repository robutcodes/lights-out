import Select from "react-select";

export type DropdownProps = {
    options: Array<{ value: string, label: string }>,
    onChange?: (e: any) => void,
    className?: string,
    disabled?: boolean,
    value?: string,
    [key: string]: any
}

const Dropdown = ({ options, className, onChange, value }: DropdownProps) => {
    return (
        <>
            <Select
                className={`h-auto ${className}`}
                aria-labelledby="difficulty"
                tabIndex={2}
                options={options}
                onChange={onChange}
                value={options.find(option => option.value === value)}
                defaultInputValue={value}
            />
        </>
    )
};

export default Dropdown;