import { useState, useEffect } from "react";
import PostService, { AxiosError, CanceledError } from "../services/PostService";
import { IPost } from "../services/Types";
import { PostFilter } from "../services/PostService";

function usePostsByFilter() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<PostFilter>("recent");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = PostService.get(selectedFilter, page);
    request
      .then((res) => {
        const posts = res.data as IPost[];
        setPosts(posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err instanceof CanceledError) return;
        setError(err);
        console.log(err);
      });

    return () => cancel();
  }, [selectedFilter, page]);

  const handleFilterSelection = (filter: PostFilter) => {
    setSelectedFilter(filter);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    posts,
    error,
    loading,
    selectedFilter,
    handleFilterSelection,
    page,
    handleNextPage,
    handlePrevPage,
  };
}

export default usePostsByFilter;
