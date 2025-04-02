import { api } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferResponseType } from "hono";

type $get = typeof api.utils.crossed.$get;
type ResponseType = InferResponseType<$get, 200>;

export const useGetName = (submitted_code: string | null) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["isCrossed", { submitted_code }],
    enabled: !!submitted_code,
    queryFn: async () => {
      const response = await axios.get<ResponseType>(
        `/api/utils/crossed?unique_code=${submitted_code}`
      );
      if (response.status !== 200)
        throw new Error("Failed to check if participant has crossed!");
      return response.data;
    },
  });
  return query;
};
