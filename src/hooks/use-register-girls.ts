import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  typeof api.register.girls.$post,
  201
>["data"];
type RequestType = InferRequestType<typeof api.register.girls.$post>["json"];

export const useRegisterGirls = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await api.register.girls.$post({ json: data });
      if (!response.ok) throw new Error("Failed to register participant");
      const res = await response.json();
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Successfully registered ${data.unique_code}`);
    },
    onError: (error, variables) => {
      toast.error(
        `Failed to register participant ${variables.name} (${variables.unique_code})`
      );
      console.error(error);
    },
  });
  return mutation;
};
