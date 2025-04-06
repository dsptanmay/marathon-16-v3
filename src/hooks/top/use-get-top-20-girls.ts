import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.participants.top20.girls.$get,
  200
>["data"];

export const useGetTop20Girls = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-top-20-girls"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.top20.girls.$get();
      if (!response.ok)
        throw new Error("Failed to fetch top 20 girls participants");
      return (await response.json()).data;
    },
  });
  return query;
};
