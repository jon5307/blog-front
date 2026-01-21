import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPostProps {
  title: string;
  summary: string;
  date: string;
  image?: string;
}

export function BlogCard({ title, summary, date, image }: BlogPostProps) {
  const category = "Development";
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* 썸네일 이미지 영역 */}
      {image && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-primary border-primary">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
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
  )
}