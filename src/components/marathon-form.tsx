"use client";

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
import { useRegisterBoys } from "@/hooks/use-register-boys";
import { useRegisterGirls } from "@/hooks/use-register-girls";
import { useRouter } from "next/navigation";

function TextLabel({
  children,
  isRequired,
}: {
  children: React.ReactNode;
  isRequired: boolean;
}) {
  if (!isRequired) return <div className="text-base">{children}</div>;
  return (
    <div className="text-base">
      {children} <span className="text-rose-500">*</span>
    </div>
  );
}

export default function MarathonForm({ type }: { type: "Boys" | "Girls" }) {
  const router = useRouter();
  const {
    mutate: registerBoys,
    status: regBoysStatus,
    error: regBoysError,
  } = useRegisterBoys();

  const {
    mutate: registerGirls,
    status: regGirlStatus,
    error: regGirlError,
  } = useRegisterGirls();

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

  const isPending =
    regBoysStatus === "pending" ||
    regGirlStatus === "pending" ||
    form.formState.isSubmitting;

  const onSubmit = async (data: MarathonFormValues) => {
    console.log(data);
    // return;
    let isSitian: boolean | null = null;
    if (data.usn) {
      isSitian = data.usn.toUpperCase().startsWith("1SI");
    }
    if (type === "Boys") {
      registerBoys({
        name: data.fullName,
        email: data.emailId,
        phone_no: data.phoneNumber,
        unique_code: data.uniqueCode,
        usn: data.usn,
        isSitian,
      });
      if (regBoysStatus === "success") router.push("/");
    } else if (type === "Girls") {
      registerGirls({
        name: data.fullName,
        email: data.emailId,
        phone_no: data.phoneNumber,
        unique_code: data.uniqueCode,
        usn: data.usn?.toUpperCase(),
        isSitian,
      });
    }
    form.reset();
  };

  if (regBoysError) {
    return (
      <div className="p-6 flex flex-col bg-bg rounded-base border-2 border-border text-center">
        <h1 className="text-xl font-bold">Failed to register participant!</h1>
        <h2>{regBoysError.message}</h2>
      </div>
    );
  }
  if (regGirlError) {
    return (
      <div className="p-6 flex flex-col">
        <h1>Failed to register participant!</h1>
        <h2>{regGirlError.message}</h2>
      </div>
    );
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-bg p-6 shadow-none border-2 border-border space-y-6 rounded-base"
        >
          <div className="flex flex-col text-center">
            <h1 className="text-xl font-bold">Registration for {type}</h1>
            <h2>Enter details here</h2>
          </div>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TextLabel isRequired>Full Name</TextLabel>
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
                  <TextLabel isRequired>Unique Code</TextLabel>
                </FormLabel>
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
                <FormLabel>
                  <TextLabel isRequired={false}>USN</TextLabel>
                </FormLabel>
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
                <FormLabel>
                  <TextLabel isRequired>Phone Number</TextLabel>
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
                  <TextLabel isRequired>Email ID</TextLabel>
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="name@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-medium py-6 text-base"
            variant={"noShadow"}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
