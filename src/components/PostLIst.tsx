import type { Post } from "@/pages/PostListPage";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MyPagination } from "./MyPagination";
import { PostListCardSkeleton, PostListCard } from "./PostListCard";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface PostListProps {
  categoryId: number | null;
}

export default function PostList({ categoryId }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/list`, {
          params: {
            categoryId: categoryId,
            page: page - 1
          }
        })
        if (!response.data.empty) {
          setPosts(response.data.content);
          setTotalPages(response.data.page.totalPages);
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [categoryId, page])

  if (posts.length === 0 && !loading) {
    return <Card className="border-dashed">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">아직 작성된 글이 없습니다</CardTitle>
        <CardDescription>
          다른 카테고리를 선택하거나 곧 업데이트될 콘텐츠를 기다려주세요.
        </CardDescription>
      </CardHeader>
    </Card>
  }

  return <>
    <div className="grid grid-cols-1 gap-6 scroll-mt-20" ref={topRef}>
      {loading ?
        Array.from({ length: 10 }).map((_, index) => (
          <PostListCardSkeleton key={index}></PostListCardSkeleton>
        )) :
        posts.map((post) => (
          <PostListCard
            key={post.id}
            id={post.id}
            title={post.title}
            summary={post.summary + "..."}
            date={post.createdDate}
          />
        ))}
    </div>
    {totalPages > 1 && (
      <MyPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setLoading(true);
          setPage(newPage);
          requestAnimationFrame(() => {
            topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }}
      />
    )}
  </>
}