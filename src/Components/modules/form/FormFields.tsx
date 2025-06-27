// S - Single Responsibility Principle
// Componentes separados para cada input

import React from 'react';
import { Input, Textarea } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionInput = motion(Input);
const MotionTextarea = motion(Textarea);

interface FormFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    variants: any;
    controls: any;
    required?: boolean;
    type?: string;
}

interface TextareaFieldProps extends Omit<FormFieldProps, 'type'> {
    rows?: number;
}

const inputStyles = {
    size: "lg",
    bg: "rgba(255, 255, 255, 0.05)",
    border: "1px solid",
    borderColor: "rgba(182, 80, 242, 0.3)",
    _focus: { borderColor: "#B650F2" },
    _placeholder: { color: "gray.400" }
};

export const FormInput: React.FC<FormFieldProps> = ({
    placeholder,
    value,
    onChange,
    variants,
    controls,
    required = false,
    type = "text"
}) => {
    return (
        <MotionInput
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            variants={variants}
            initial="hidden"
            animate={controls}
            required={required}
            {...inputStyles}
        />
    );
};

export const FormTextarea: React.FC<TextareaFieldProps> = ({
    placeholder,
    value,
    onChange,
    variants,
    controls,
    required = false,
    rows = 6
}) => {
    return (
        <MotionTextarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            variants={variants}
            initial="hidden"
            animate={controls}
            required={required}
            rows={rows}
            {...inputStyles}
        />
    );
};
