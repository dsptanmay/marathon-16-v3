import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.walkathon.$get,
  200
>["data"];

const useGetWalkathonParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-walkathon-participants"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.all.walkathon.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all walkathon participants!");
      return (await response.json()).data;
    },
  });
  return query;
};

export default useGetWalkathonParticipants;
