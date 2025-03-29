"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function BoysRegistrationPage() {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    unique_code: z
      .string()
      .length(6, "Must be 6 characters in length")
      .regex(/^\d{5}[A-Z]{1}$/, "Must match unique code pattern!")
      .refine((arg) => {
        const digits = arg.slice(0, 5);
        const digitSum = [...digits].reduce(
          (sum, digit) => sum + parseInt(digit),
          0
        );
        const expectedDigit = arg.charCodeAt(5) - 64;

        return digitSum % 26 == expectedDigit;
      }, "Unique Code does not match given conditions!"),
    usn: z.string().optional(),
    phone_number: z
      .string()
      .length(10)
      .regex(/^\d{10}$/, "Phone number can only contain digits"),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="bg-bg w-full p-7">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 font-bold w-full flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-rose-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unique_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Unique Code<span className="text-rose-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="12345A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USN</FormLabel>
                <FormControl>
                  <Input placeholder="1SIXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number<span className="text-rose-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className="text-rose-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="name@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="sm:w-full w-fit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default BoysRegistrationPage;
