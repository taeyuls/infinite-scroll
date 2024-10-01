import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTopRatedMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDhhMjI1N2Y1OGM2MTRmYmY1ZjVhYzQ4ZjkxYjkwYyIsIm5iZiI6MTcyNzc2MTgzMy43MDE1MzQsInN1YiI6IjY1YmI0MGZhZDdjZDA2MDE2MTUyNjllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nueHyCRz4NwPRD-RZxFa2mTbKjuLO1ddgYUYXLpUSM",
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
