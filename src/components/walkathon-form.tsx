"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRegisterWalkathon } from "@/hooks/use-register-walkathon";
import { walkathonSchema, type WalkathonFormValues } from "@/lib/form-schemas";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-base">
      {children} <span className="text-rose-500">*</span>
    </div>
  );
}

export default function WalkathonForm() {
  const {
    mutate: registerParticipant,
    error: regError,
    status: regStatus,
  } = useRegisterWalkathon();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const schema = walkathonSchema;

  const form = useForm<WalkathonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      uniqueCode: "",
      phoneNumber: "",
      emailId: "",
      gender: "male",
    },
  });

  const onSubmit = async (data: WalkathonFormValues) => {
    registerParticipant({
      email: data.emailId,
      name: data.fullName,
      phone_no: data.phoneNumber,
      unique_code: data.uniqueCode,
      gender: data.gender,
    });
    setSubmitSuccess(true);
    form.reset();
  };

  return (
    <div>
      {submitSuccess ? (
        <div className="bg-background rounded-base p-6 shadow-none border border-border text-center">
          <h3 className="text-xl font-bold mb-4">Registration Successful!</h3>
          <p className="mb-4">Thank you for registering for the event.</p>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full rounded-base p-6 shadow-none border-2 border-border space-y-6 bg-background"
          >
            <div className="text-center mb-3 mt-3">
              <h1 className="text-2xl font-heading">Walkathon Registration</h1>
              <h2>Enter details here</h2>
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <RequiredLabel>Full Name</RequiredLabel>
                  </FormLabel>

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
                  <FormLabel>
                    <RequiredLabel>Unique Code</RequiredLabel>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <RequiredLabel>Phone Number</RequiredLabel>
                  </FormLabel>
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
                  <FormLabel>
                    <RequiredLabel>Email ID</RequiredLabel>
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <RequiredLabel>Gender</RequiredLabel>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select yout gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-base py-6 px-4 w-full"
              variant={"noShadow"}
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
