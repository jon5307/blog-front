import { PostListCard } from "@/components/PostListCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { MyPagination } from "@/components/MyPagination";

interface Post {
  id: number;
  title: string;
  summary: string;
  createdDate: string;
}

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/list?page=${page-1}`);
        if (!response.data.empty) {
          setPosts(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [page]);

  return (
    <>
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          글 목록
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {loading ? Array.from({ length: 5 }).map((_, index) => (
            <PostListCard key={index} loading={true}></PostListCard>
          )) :
          posts.map((post) => (
            <PostListCard
              key={post.id}
              id={post.id}
              title={post.title}
              summary={post.summary+"..."}
              date={post.createdDate}
            />
          ))}
      </div>
      { totalPages > 1 && (
        <MyPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setLoading(true);
            setPage(newPage);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </>
  );
}
