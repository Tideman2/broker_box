'use client';

import { useRef } from 'react';
import { Stack, TextField } from '@mui/material';

const DEFAULT_LENGTH = 6;

type OtpInputProps = {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    disabled?: boolean;
};

export default function OtpInput({
    value,
    onChange,
    length = DEFAULT_LENGTH,
    disabled,
}: OtpInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = (index: number) => {
        const clamped = Math.max(0, Math.min(index, length - 1));
        inputsRef.current[clamped]?.focus();
        inputsRef.current[clamped]?.select();
    };

    const handleChange = (index: number, raw: string) => {
        const digit = raw.replace(/\D/g, '').slice(-1);

        if (!digit) return;

        const position = Math.min(index, value.length);
        const next = `${value.slice(0, position)}${digit}`.slice(0, length);

        onChange(next);
        focusInput(next.length);
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Backspace') {
            event.preventDefault();

            if (index < value.length) {
                onChange(value.slice(0, index) + value.slice(index + 1));
                focusInput(index);
                return;
            }

            const previous = Math.max(0, index - 1);
            onChange(value.slice(0, previous));
            focusInput(previous);
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            focusInput(index - 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            focusInput(index + 1);
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, length);

        if (!pasted) return;

        onChange(pasted);
        focusInput(pasted.length);
    };

    return (
        <Stack direction="row" spacing={1} justifyContent="center">
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    inputRef={(element) => {
                        inputsRef.current[index] = element;
                    }}
                    value={value[index] ?? ''}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    autoFocus={index === 0}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        maxLength: 1,
                        'aria-label': `One-time code digit ${index + 1}`,
                        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) =>
                            handleKeyDown(index, event),
                        style: {
                            textAlign: 'center',
                            fontSize: '1.25rem',
                            padding: '12px 0',
                        },
                    }}
                    sx={{ width: 48 }}
                />
            ))}
        </Stack>
    );
}
