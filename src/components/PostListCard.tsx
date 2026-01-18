import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface BlogPostProps {
  id: number;
  title: string;
  summary: string;
  date: string;
}

export function PostListCard({ id, title, summary, date, }: BlogPostProps) {
  return (
    <Link to={`/post/${id}`}>
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">{format(new Date(date), "yyyy년 M월 d일", { locale: ko })}</span>
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