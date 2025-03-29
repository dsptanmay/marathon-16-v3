"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { walkathonSchema, type WalkathonFormValues } from "@/lib/form-schemas";

export default function WalkathonForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const schema = walkathonSchema;

  const form = useForm<WalkathonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      uniqueCode: "",
      phoneNumber: "",
      emailId: "",
    },
  });

  const onSubmit = async (data: WalkathonFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {submitSuccess ? (
        <div className="bg-bw dark:bg-bw rounded-custom p-6 shadow-custom border border-border text-center">
          <h3 className="text-xl font-bold mb-4">Registration Successful!</h3>
          <p className="mb-4">Thank you for registering for the event.</p>
          <button
            className="bg-main text-mtext font-base py-2 px-4 rounded-custom shadow-custom border border-border"
            onClick={() => setSubmitSuccess(false)}
          >
            Register Another
          </button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-bw dark:bg-bw rounded-custom p-6 shadow-custom border border-border space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uniqueCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="5 digits + 1 uppercase letter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="bg-main text-mtext font-base py-2 px-4 rounded-custom shadow-custom border border-border w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Register"}
            </button>
          </form>
        </Form>
      )}
    </div>
  );
}
