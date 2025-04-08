import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type $post = typeof api.register.girls.$post;
type ResponseType = InferResponseType<$post, 201>["data"];
type RequestType = InferRequestType<$post>["json"];

export const useRegisterGirls = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async function (data) {
      const response = await api.register.girls.$post({ json: data });
      if (!response.ok) throw new Error("Failed to register participant!");
      const res = await response.json();
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Successfully registered ${variables.name} (${variables.unique_code})!`
      );
      router.push(`/code/${variables.unique_code}`);
    },
    onError: (error, variables) => {
      toast.error(
        `Failed to register participant ${variables.name} (${variables.unique_code})!`
      );
      console.error(error);
    },
  });
  return mutation;
};
