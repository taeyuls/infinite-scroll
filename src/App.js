import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetTopRatedMovies from "./hooks/useGetTopRatedMovies";

export default function App() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTopRatedMovies();
  console.log("asdsad", data);
  const { ref, inView } = useInView();

  useEffect(() => {
    console.log("화면에 있습니까?", inView);

    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="App">
      {/* 데이터와 페이지가 존재하는지 확인 후 렌더링 */}
      {data && data.pages ? (
        <div className="grid grid-cols-3 gap-4 max-w-[1000px] m-auto">
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results?.map((movie) => (
                <div key={movie.id} className="col-span-1">
                  <div className="flex justify-center items-center h-full">
                    <div className="w-full h-full object-cover">
                      <img
                        className="w-[200px] h-[300px] object-cover"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}

      {hasNextPage && (
        <h1
          ref={ref}
          className="flex justify-center items-center mt-4 mb-4 text-3xl font-bold"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "🔍 빨리 보여줘 👀" : "Load more"}
        </h1>
      )}
    </div>
  );
}
