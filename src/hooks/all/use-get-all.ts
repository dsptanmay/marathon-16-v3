import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.$get,
  200
>["data"];

const useGetAllParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-all-participants"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.all.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all participants!");
      return (await response.json()).data;
    },
  });
  return query;
};

export default useGetAllParticipants;
