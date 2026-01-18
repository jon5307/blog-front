import { BlogCard } from "@/components/BlogCard"

export default function HomePage() {
  const posts = [
    {
      id: 1,
      title: "React와 Shadcn UI로 시작하는 모던 웹 개발",
      summary: "컴포넌트 기반의 UI 라이브러리를 사용하여 빠르고 아름다운 웹사이트를 만드는 방법을 알아봅니다.",
      category: "Frontend",
      author: "Kim Developer",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Spring Boot 백엔드 연동 가이드",
      summary: "REST API를 구축하고 리액트 프론트엔드와 데이터를 주고받는 전체적인 흐름을 실습합니다.",
      category: "Backend",
      author: "Lee Coder",
      date: "2024-03-18",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "TypeScript 100% 활용하기",
      summary: "타입 안전성을 보장하며 개발 생산성을 높이는 고급 타입스크립트 패턴들을 소개합니다.",
      category: "Language",
      author: "Park Tech",
      date: "2024-03-15",
      // 이미지가 없는 경우 테스트
    }
  ]
  return (
    <>
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Knowledge Hub
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          개발 지식과 경험을 공유하는 공간입니다. <br className="hidden sm:inline" />
          함께 성장하는 개발자가 되어봅시다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            summary={post.summary}
            category={post.category}
            author={post.author}
            date={post.date}
            image={post.image}
          />
        ))}
      </div>
      </>
  )
}