"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { marathonSchema, type MarathonFormValues } from "@/lib/form-schemas";
import { Button } from "@/components/ui/button";

export default function MarathonForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const schema = marathonSchema;

  const form = useForm<MarathonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      uniqueCode: "",
      usn: "",
      phoneNumber: "",
      emailId: "",
    },
  });

  const onSubmit = async (data: MarathonFormValues) => {
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
            className="bg-bw p-6 shadow-shadow border border-border space-y-6 rounded-base"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
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
              name="usn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USN</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1SIXXXXXXX" />
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
                    <Input type="tel" {...field} placeholder="1234567890" />
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
                    <Input
                      type="email"
                      {...field}
                      placeholder="name@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full font-medium py-6 text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Register"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
