import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { format, isValid, parseISO } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface BlogPostProps {
  id: number;
  title: string;
  summary: string;
  date: string;
}

export function PostListCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-3 w-24" />
        </div>

        <CardTitle className="text-xl">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>

        <CardDescription className="mt-2 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="grow" />
    </Card>
  )
}

export function PostListCard({ id, title, summary, date }: BlogPostProps) {
  const parsedDate = date ? parseISO(date) : null;
  const formattedDate = parsedDate && isValid(parsedDate)
    ? format(parsedDate, "yyyy년 M월 d일", { locale: ko })
    : "-";
  return (
    <Link to={`/post/${id}`}>
      <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-2 mt-2">
            {summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="grow">
          {/* 필요한 경우 추가 내용 배치 */}
        </CardContent>
      </Card>
    </Link>
  )
}
