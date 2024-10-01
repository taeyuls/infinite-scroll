import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }
  );
  return response.json();
};

const useGetTopRatedMovies = () => {
  return useInfiniteQuery({
    queryKey: ["top-rated-movies"],
    queryFn: ({ pageParam }) => {
      return fetchTopRatedMovies(pageParam);
    },
    getNextPageParam: (last) => {
      if (last.page < last.total_pages) {
        return last.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetTopRatedMovies;
