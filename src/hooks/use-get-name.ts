import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type $get = typeof api.utils.crossed.$get;
type ResponseType = InferResponseType<$get, 200>;

export const useGetName = (submitted_code: string | null) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["isCrossed", { submitted_code }],
    enabled: false,
    queryFn: async () => {
      const response = await api.utils.crossed.$get({
        query: { unique_code: submitted_code! },
      });
      if (response.status === 400)
        throw new Error("Participant has not crossed finish line yet!");
      else if (response.status === 404)
        throw new Error("Participant not found!");
      else if (!response.ok)
        throw new Error("Failed to fetch participant status!");
      return await response.json();
    },
  });
  return query;
};
