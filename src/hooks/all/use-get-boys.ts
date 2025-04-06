import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.boys.$get,
  200
>["data"];

const useGetBoysParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-boys-participants"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.all.boys.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all boys participants!");
      return (await response.json()).data;
    },
  });
  return query;
};

export default useGetBoysParticipants;
