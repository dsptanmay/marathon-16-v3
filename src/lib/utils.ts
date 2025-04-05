import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidCode(code: string): boolean {
  if (!/^\d{5}[A-Z]{1}$/.test(code)) return false;
  const digits = code.slice(0, 5);
  const letter = code.slice(5);
  const sum = Array.from(digits).reduce(
    (acc, digit) => acc + Number.parseInt(digit),
    0
  );
  const remainder = sum % 26;
  const expectedLetter = String.fromCharCode(65 + remainder); // 65 is ASCII for 'A'

  return letter === expectedLetter;
}
