import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import PostList from "@/components/PostLIst";

interface Category {
  id: number;
  name: string;
  description: string;
  postCount: number;
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
            {categories.find((category) => category.id === selectedCategory)?.postCount} posts
          </Badge>
        </div>

        <PostList categoryId={selectedCategory} />
      </div>
    </section>
  );
}
