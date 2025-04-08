import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.participants.top10.walkathon_males.$get,
  200
>["data"];

export const useGetTop10WalkathonMales = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-top-10-walkathon_m"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.top10.walkathon_males.$get();
      if (!response.ok)
        throw new Error("Failed to fetch top 10 Male walkathon participants");
      return (await response.json()).data;
    },
  });
  return query;
};
