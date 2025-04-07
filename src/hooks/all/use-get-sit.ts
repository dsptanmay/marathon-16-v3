import { api } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  typeof api.participants.all.sit.$get,
  200
>["data"];

const useGetSITParticipants = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["get-sit-participants"],
    enabled: false,
    queryFn: async () => {
      const response = await api.participants.all.sit.$get();
      if (!response.ok)
        throw new Error("Failed to fetch all SIT participants!");
      return (await response.json()).data;
    },
  });
  return query;
};

export default useGetSITParticipants;
