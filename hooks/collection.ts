import { getPhotosByCollection } from "@/data/unsplash";
import { useQuery } from "@tanstack/react-query";

export const getCollectionQuery = () => useQuery({
  queryKey: ["get-collections"],
  queryFn: async () => await getPhotosByCollection()
})