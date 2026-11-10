import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getNoticesByAuthor } from "@/lib/notices";
import { NoticeListItem } from "@/components/NoticeListItem";

// (11주차 과제 · SNS 응용) "내가 쓴 글"
// 쇼핑몰의 "주문 생성 + 소유권 기반 조회(/orders)"를 게시판에 그대로 옮긴 것입니다.
// 로그인한 사용자의 id를 조회 조건에 직접 넣기 때문에, URL이나 폼을 조작해도
// 다른 사람의 글 목록은 이 페이지에 나타나지 않습니다.
export default async function MyNoticesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const notices = await getNoticesByAuthor(session.user.id);

  return (
    <div className="mx-auto max-w-2xl flex-1 px-8 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">내가 쓴 글</h1>
        <Link
          href="/notices/new"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          + 새 글 작성
        </Link>
      </div>

      {notices.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/[.08] px-5 py-10 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
          아직 내가 쓴 글이 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {notices.map((n) => (
            <NoticeListItem key={n.id} notice={n} />
          ))}
        </ul>
      )}
    </div>
  );
}
