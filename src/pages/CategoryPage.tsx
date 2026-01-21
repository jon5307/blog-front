import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PostListCard } from "@/components/PostListCard";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Post {
  id: number;
  title: string;
  summary: string;
  createdDate: string;
  category: number;
}

export default function CategoryPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/category/list`);
        if (!response.data.empty) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/list?categoryId=${selectedCategory ?? ""}&size=100`);
        if (response.status === 200) {
          setPosts(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [selectedCategory]);


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mx-auto">
          카테고리 탐색
        </Badge>
        <h2 className="text-4xl md:text-5xl font-extrabold">
          주제별로 정리된 글
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          카테고리 별로 글을 볼 수 있습니다.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => {
            return (
              <Card
                key={category.id}
                className="border-muted/40 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge variant="outline">
                      {category.name}
                    </Badge>
                    <CardTitle className="text-xl">{category.description}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    살펴보기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">선택된 카테고리</p>
            <h3 className="text-2xl font-bold">
              {selectedCategory === null
                ? "전체 글"
                : categories.find((category) => category.id === selectedCategory)?.name}
            </h3>
          </div>
          <Badge variant="secondary" className="w-fit">
            {posts.length} posts
          </Badge>
        </div>

        {posts.length === 0 ? (
          <Card className="border-dashed">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">아직 작성된 글이 없습니다</CardTitle>
              <CardDescription>
                다른 카테고리를 선택하거나 곧 업데이트될 콘텐츠를 기다려주세요.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <PostListCard
                key={post.id}
                id={post.id}
                title={post.title}
                summary={post.summary}
                date={post.createdDate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
