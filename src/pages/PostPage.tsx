import { useParams, Link } from "react-router-dom"
import { format, isValid, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
  content: string;
  createdDate: string;
  id: number;
  summary: string;
  title: string;
}

export default function PostPage() {
  const { id } = useParams()
  const [data, setData] = useState<Post|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/detail/${id}`);
        setData(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [id]);
  
  if (loading || data === null) {
    return (
      <article className="container max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
        {/* 1. 상단 네비게이션 & 카테고리 */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            asChild
            className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
          >
            <Link to="/post">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로
            </Link>
          </Button>
          {/* <Badge variant="secondary" className="text-sm">
          {data.category}
        </Badge> */}
        </div>
        {/* 2. 헤더 섹션 (제목 + 메타 정보) */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:leading-[1.1]">
            <Skeleton className="h-5 w-[300px]" />
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
            {/* 날짜 & 읽는 시간 */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>
                  <Skeleton className="h-5 w-[100px]" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 썸네일 이미지 (옵션) */}
        {/* <div className="my-10 aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" 
          alt={data.title}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
        />
      </div> */}

        {/* 4. 본문 내용 */}
        <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
          {/* 줄바꿈 처리를 위해 whitespace-pre-line 사용 */}
          <Skeleton className="h-[200px] w-full mb-2" />
        </div>

      </article>
    )
  }

  const parsedDate = data?.createdDate ? parseISO(data.createdDate) : null;
  const formattedDate = parsedDate && isValid(parsedDate)
    ? format(parsedDate, "yyyy년 M월 d일", { locale: ko })
    : "-";

  return (
    <article className="container max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      {/* 1. 상단 네비게이션 & 카테고리 */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          asChild
          className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
        >
          <Link to="/post">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>
        {/* <Badge variant="secondary" className="text-sm">
          {data.category}
        </Badge> */}
      </div>
      {/* 2. 헤더 섹션 (제목 + 메타 정보) */}
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:leading-[1.1]">
          {data.title}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          {/* 날짜 & 읽는 시간 */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 썸네일 이미지 (옵션) */}
      {/* <div className="my-10 aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop" 
          alt={data.title}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
        />
      </div> */}

      {/* 4. 본문 내용 */}
      <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
        {/* 줄바꿈 처리를 위해 whitespace-pre-line 사용 */}
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {data.content}
        </ReactMarkdown>
      </div>

    </article>
  )
}
