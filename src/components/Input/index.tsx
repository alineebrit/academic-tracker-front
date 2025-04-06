import React from "react";
import "./style.css";

type InputProfileProps = {
    label?: string;
    value: string | number | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
};

const InputProfile: React.FC<InputProfileProps> = ({
    label,
    value,
    onChange,
    type = "text",
    disabled = false,
    required = false,
    placeholder = "",
}) => {
    return (
        <div className="input-group">
            <p className="input-label">
                {label} {required && "*"}
            </p>
            <input
                className="input-field"
                type={type}
                value={value || undefined}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                style={{maxWidth: "380px", minHeight: "32px"}}
            />
        </div>
    );
};

export default InputProfile;
