import styled from "styled-components";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ActionButtonProps = {
    outlined?: boolean;
    children?: ReactNode;
    disabled?: boolean;
    onClick?: () => Promise<void>;
};

export function ActionButton({ outlined, onClick, children, disabled }: ActionButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={twMerge(
                ["px-5", "py-2.5", "rounded-md", "font-bold", "cursor-pointer"],
                outlined
                    ? ["bg-white", "text-primary-main", "border", "border-divider"]
                    : ["bg-primary-main", "text-white"],
            )}>
            {children}
        </button>
    );
}

export const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    min-height: 200px;
    resize: vertical;
`;
