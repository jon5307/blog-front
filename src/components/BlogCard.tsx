import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface BlogPostProps {
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  image?: string;
}

export function BlogCard({ title, summary, category, author, date, image }: BlogPostProps) {
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

      <CardFooter className="flex justify-between items-center border-t p-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {author}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          Read More →
        </Button>
      </CardFooter>
    </Card>
  )
}