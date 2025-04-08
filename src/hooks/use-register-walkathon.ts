import env from "@/lib/env";
import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type $post = typeof api.register.walkathon.$post;
type ResponseType = InferResponseType<$post, 201>["data"];
type RequestType = InferRequestType<$post>["json"];

export const useRegisterWalkathon = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async function (data) {
      const response = await api.register.walkathon.$post({ json: data });
      if (!response.ok) throw new Error("Failed to register participant!");
      const res = await response.json();
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Successfully registered ${variables.name} (${variables.unique_code})!`
      );
      if (env.NODE_ENV !== "production") console.log(data);
      router.push(`/code/${variables.unique_code}`);
    },
    onError: (error, variables) => {
      toast.error(
        `Failed to register ${variables.name} (${variables.unique_code})!`
      );
      console.error(error);
    },
  });

  return mutation;
};
