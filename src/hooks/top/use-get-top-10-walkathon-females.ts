import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.participants.top10.walkathon_females.$get,
  200
>["data"];

export const useGetTop10WalkathonFemales = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-top-10-walkathon_f"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.top10.walkathon_females.$get();
      if (!response.ok)
        throw new Error("Failed to fetch top 10 Female walkathon participants");
      return (await response.json()).data;
    },
  });
  return query;
};
