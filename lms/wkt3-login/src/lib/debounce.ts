/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility debounce function to reduce rapid updates (used in password strength checker)
export function debounce(func: (...args: any[]) => void, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
