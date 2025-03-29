import { z } from "zod";

// Base schema for common fields
const baseSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  uniqueCode: z
    .string()
    .min(6, "Unique code must be 6 characters")
    .max(6, "Unique code must be 6 characters")
    .refine(
      (code) => {
        // Check if first 5 characters are digits
        const digits = code.substring(0, 5);
        if (!/^\d{5}$/.test(digits)) return false;

        // Check if last character is uppercase letter
        const letter = code.substring(5, 6);
        if (!/^[A-Z]$/.test(letter)) return false;

        // Calculate the expected letter
        const sum = Array.from(digits).reduce(
          (acc, digit) => acc + Number.parseInt(digit),
          0
        );
        const remainder = sum % 26;
        const expectedLetter = String.fromCharCode(65 + remainder); // 65 is ASCII for 'A'

        return letter === expectedLetter;
      },
      {
        message: "Invalid unique code format",
      }
    ),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Phone number must contain only digits",
    }),
  emailId: z.string().email("Invalid email format"),
});

// Schema for Boys and Girls with USN
export const marathonSchema = baseSchema.extend({
  usn: z.string().optional(),
});

// Schema for Walkathon (same as base schema)
export const walkathonSchema = baseSchema;

// Schema for certificate retrieval
export const certificateSchema = z.object({
  uniqueCode: z
    .string()
    .min(6, "Unique code must be 6 characters")
    .max(6, "Unique code must be 6 characters")
    .refine(
      (code) => {
        // Check if first 5 characters are digits
        const digits = code.substring(0, 5);
        if (!/^\d{5}$/.test(digits)) return false;

        // Check if last character is uppercase letter
        const letter = code.substring(5, 6);
        if (!/^[A-Z]$/.test(letter)) return false;

        // Calculate the expected letter
        const sum = Array.from(digits).reduce(
          (acc, digit) => acc + Number.parseInt(digit),
          0
        );
        const remainder = sum % 26;
        const expectedLetter = String.fromCharCode(65 + remainder); // 65 is ASCII for 'A'

        return letter === expectedLetter;
      },
      {
        message: "Invalid unique code format",
      }
    ),
});

export type MarathonFormValues = z.infer<typeof marathonSchema>;
export type WalkathonFormValues = z.infer<typeof walkathonSchema>;
export type CertificateFormValues = z.infer<typeof certificateSchema>;
