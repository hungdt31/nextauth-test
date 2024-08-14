import { getPhotosOrderByPopular } from "@/data/unsplash";
import { useQuery } from "@tanstack/react-query";

export const getPhotoPopularQuery = () => useQuery({
  queryKey: ["get-photo-popular"],
  queryFn: async () => await getPhotosOrderByPopular()
})