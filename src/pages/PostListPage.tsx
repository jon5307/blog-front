import PostList from "@/components/PostLIst";

export interface Post {
  id: number;
  title: string;
  summary: string;
  createdDate: string;
}

export default function PostListPage() {

  return (
    <>
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          전체 글 목록
        </h2>
      </div>
      <PostList categoryId={null} />
    </>
  );
}
