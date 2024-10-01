import React from "react";
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
  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      {/* 데이터가 있는지 확인 후 렌더링 */}
      {data && data.pages ? (
        <div className="grid grid-cols-3 gap-4 max-w-[1000px] m-auto">
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((movie) => (
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
        <button onClick={fetchNextPage} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
}
