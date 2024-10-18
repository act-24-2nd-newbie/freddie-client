export const Greeting = {
  MORNING: 'Good morning',
  AFTERNOON: 'Good afternoon',
  EVENING: 'Good evening',
  NIGHT: 'Good night',
} as const;

export const Greetings = [Greeting.NIGHT, Greeting.MORNING, Greeting.AFTERNOON, Greeting.EVENING, Greeting.NIGHT];
