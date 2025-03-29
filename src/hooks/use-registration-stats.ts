import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/hono";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  typeof api.counts.registrations.$get,
  200
>;

export function useRegistrationStats(refreshInterval = 5000) {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["registration-stats"],
    queryFn: async () => {
      const response = await api.counts.registrations.$get();
      if (!response.ok) throw new Error("Failed to fetch latest counts");
      return await response.json();
    },
    refetchInterval: refreshInterval,
  });
  return query;
}
