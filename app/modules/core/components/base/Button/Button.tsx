import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { BUTTON_COLOR, BUTTON_COLOR_CLASSNAMES, BUTTON_VARIANT, ButtonColor, ButtonVariant } from './constants';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  variant?: ButtonVariant;
}

export default function Button({
  'aria-label': ariaLabel,
  className,
  children,
  color = BUTTON_COLOR.primary,
  onClick,
  variant = BUTTON_VARIANT.filled,
}: ButtonProps) {
  const colorClassName = BUTTON_COLOR_CLASSNAMES[variant][color];

  return (
    <button
      aria-label={ariaLabel}
      className={twMerge(
        'px-5 py-2 text-sm font-medium rounded-full flex items-center justify-center gap-2',
        colorClassName,
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}