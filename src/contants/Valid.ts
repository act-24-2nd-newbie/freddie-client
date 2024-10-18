export const Valid = {
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type ValidType = (typeof Valid)[keyof typeof Valid];
