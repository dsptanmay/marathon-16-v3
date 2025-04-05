import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.participants.top3.walkathon_males.$get,
  200
>;

export const useGetTop3WalkathonMales = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-top-3-walkathon_m"],
    queryFn: async () => {
      const response = await api.participants.top3.walkathon_males.$get();
      if (!response.ok)
        throw new Error("Failed to fetch top 3 male walkathon participants");
      return await response.json();
    },
  });
  return query;
};
