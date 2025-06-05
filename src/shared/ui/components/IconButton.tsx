import { PropsWithChildren, ButtonHTMLAttributes } from "react";

import styles from "./iconButton.module.css";

interface IconButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
}

/**
 * Кнопка-иконка
 */
export default function IconButton({
  onClick,
  children,
  disabled = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Icon button"
      {...props}
    >
      {children}
    </button>
  );
}
