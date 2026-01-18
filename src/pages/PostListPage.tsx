import { PostListCard } from "@/components/PostListCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  summary: string;
  createdDate: string;
}

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/post/");
        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <>
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-5xl font-extrabold">
        글 목록
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-6">
      {posts.map((post) => (
        <PostListCard
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.createdDate}
        />
      ))}
    </div>
    </>
  );
}