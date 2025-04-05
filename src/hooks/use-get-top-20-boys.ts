import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.participants.top20.boys.$get,
  200
>;

export const useGetTop20Boys = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-top-20-boys"],
    queryFn: async () => {
      const response = await api.participants.top20.boys.$get();
      if (!response.ok)
        throw new Error("Failed to fetch top 20 boys participants");
      return await response.json();
    },
  });
  return query;
};
