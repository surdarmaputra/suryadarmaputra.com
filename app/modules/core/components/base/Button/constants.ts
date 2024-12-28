export const BUTTON_COLOR = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

export const BUTTON_VARIANT = {
  filled: 'filled',
  outlined: 'outlined',
  text: 'text',
} as const;

export type ButtonColor = typeof BUTTON_COLOR[keyof typeof BUTTON_COLOR];
export type ButtonVariant = typeof BUTTON_VARIANT[keyof typeof BUTTON_VARIANT];

export const BUTTON_COLOR_CLASSNAMES: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary: 'bg-amber-500 text-slate-900',
    secondary: 'bg-slate-500 text-slate-900',
  },
  outlined: {
    primary: 'border border-amber-500 text-slate-900',
    secondary: 'border border-slate-500 text-slate-900',
  },
  text: {
    primary: 'text-amber-500',
    secondary: 'text-slate-500',
  },
};