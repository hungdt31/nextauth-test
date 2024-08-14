import { getStatMonth } from "@/data/unsplash";
import { useQuery } from "@tanstack/react-query";

export const getStatMonthQuery = () => useQuery({
  queryKey: ["get-stat-month"],
  queryFn: async () => await getStatMonth()
})