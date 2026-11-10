import Link from "next/link";
import { getNotices } from "@/lib/notices";
import { NoticeListItem } from "@/components/NoticeListItem";

// Server Component에서 바로 await로 데이터를 가져오고, 끝날 때까지 loading.tsx가 대신 보입니다.
export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <div className="mx-auto max-w-2xl flex-1 px-8 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">공지사항</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/notices/mine"
            className="text-sm text-zinc-500 underline underline-offset-4 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            내가 쓴 글
          </Link>
          <Link
            href="/notices/new"
            className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
          >
            + 새 글 작성
          </Link>
        </div>
      </div>

      {notices.length === 0 ? (
        // 9주차부터는 가짜 시드 데이터를 넣지 않습니다 — 로그인한 진짜
        // 사용자가 쓴 글만 보입니다. 그래서 진짜 빈 상태를 안내합니다.
        <p className="rounded-lg border border-dashed border-black/[.08] px-5 py-10 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
          아직 등록된 공지가 없습니다. 로그인 후 첫 글을 작성해보세요.
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
