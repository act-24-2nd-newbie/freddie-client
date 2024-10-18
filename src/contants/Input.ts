export const Input = {
  TEXT: 'text',
  EMAIL: 'email',
} as const;

export type InputType = (typeof Input)[keyof typeof Input];
