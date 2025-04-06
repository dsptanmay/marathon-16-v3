import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.girls.$get,
  200
>;

const useGetGirlsParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-girls-participants"],
    enabled: false,
    queryFn: async (c) => {
      const response = await api.participants.all.girls.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all girls participants!");
      return await response.json();
    },
  });
  return query;
};

export default useGetGirlsParticipants;
