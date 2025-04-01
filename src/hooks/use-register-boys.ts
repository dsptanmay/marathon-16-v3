import { api } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const $post = api.register.boys.$post;
type ResponseType = InferResponseType<typeof $post, 201>["data"];
type RequestType = InferRequestType<typeof $post>["json"];

export const useRegisterBoys = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async function (data) {
      const response = await axios.post<ResponseType>(
        "/api/register/boys",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 201)
        throw new Error(
          `Failed to register participant! ${response.statusText}`
        );
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Successfully registered ${variables.name} (${variables.unique_code})!`
      );
      router.push("/");
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
