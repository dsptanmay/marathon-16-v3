import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type $get = typeof api.utils.crossed.$get;
type ResponseType = InferResponseType<$get, 200>["data"];

export const useGetName = (submitted_code: string | null) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["isCrossed", { submitted_code }],
    enabled: false,
    queryFn: async () => {
      const response = await api.utils.crossed.$get({
        query: { unique_code: submitted_code! },
      });
      if (!response.ok)
        throw new Error("Failed to check if participant has crossed!");
      return (await response.json()).data;
    },
  });
  return query;
};
