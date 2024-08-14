import { getUsers, getTheRestUsers } from "@/data/unsplash";
import { useQuery } from "@tanstack/react-query";

export const getCommunityQuery = () => useQuery({
  queryKey: ["get-users"],
  queryFn: async () => await getUsers()
})

export const getTheRestQuery = () => useQuery({
  queryKey: ["get-rest-users"],
  queryFn: async () => await getTheRestUsers()
})