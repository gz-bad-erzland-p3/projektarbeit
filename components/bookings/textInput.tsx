import React, {HTMLInputTypeAttribute} from "react";

interface FloatingTextFieldComponentProps {
    name: string;
    label: string;
    value?: any;
    type: HTMLInputTypeAttribute | undefined;
    pattern?: string;
    title?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    classNameInput?: string;
    classNameLabel?: string;
    autoFocus?: boolean;
}

export default function TextInput(props: FloatingTextFieldComponentProps) {

    return (
        <div>
            <input type={props.type} name={`textField_${props.name}`}
                   value={props.value}
                   id={`textField_${props.name}`} pattern={props.pattern}
                   title={props.title}
                   className={`${props.classNameInput} block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-office-green-600 peer`}
                   placeholder=" " required={props.required || true}
                   onChange={props.onChange}
                   onClick={props.onClick}/>
            <label htmlFor={`textField_${props.name}`}
                   className={`${props.classNameLabel} peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-office-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                {props.label}
            </label>
        </div>
    );
}