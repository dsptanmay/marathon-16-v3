import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof api.register.boys.$post, 201>;
type RequestType = InferRequestType<typeof api.register.boys.$post>["json"];

export const useRegisterBoys = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await api.register.boys.$post({ json: data });
      if (!response.ok) throw new Error("Failed to register participant");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Success");
    },
  });
  return mutation;
};
