import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.boys.$get,
  200
>;

const useGetBoysParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-boys-participants"],
    enabled: false,
    queryFn: async (c) => {
      const response = await api.participants.all.boys.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all boys participants!");
      return await response.json();
    },
  });
  return query;
};

export default useGetBoysParticipants;
