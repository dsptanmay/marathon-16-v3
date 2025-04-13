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

export const fetchImageAsBase64 = async (url: string): Promise<string> => {
  // For browser environment
  if (typeof window !== "undefined") {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
  // For Node.js environment (e.g., Next.js API routes)
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:image/png;base64,${buffer.toString("base64")}`;
};
