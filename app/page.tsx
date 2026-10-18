import Link from "next/link";
import { getNotices } from "@/lib/notices";
import { NoticeListItem } from "@/components/NoticeListItem";

// "/" 홈 — Server Component. 최근 공지 3개를 DB에서 바로 읽어 보여줍니다.
const FEATURES = [
  { href: "/notices", title: "공지사항", desc: "카테고리·조회수가 있는 게시판 (MongoDB)" },
  { href: "/products", title: "굿즈 샵", desc: "상품 목록·상세·좋아요·상품 추가" },
  { href: "/register", title: "회원가입", desc: "bcrypt 해싱 + Auth.js 로그인" },
  { href: "/about", title: "소개", desc: "이 사이트와 주차별 구현 내역" },
  { href: "/api/hello", title: "API", desc: "Route Handler가 응답하는 JSON" },
];

export default async function Home() {
  const recent = (await getNotices()).slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-14">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-10 text-white shadow-sm">
        <p className="text-sm font-medium text-indigo-100">정호진 · 웹서버보안프로그래밍 실습</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">호진 보드</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100">
          Next.js 16과 MongoDB로 만든 학과 공지 게시판입니다. 3주차부터 7주차까지 배운 라우팅,
          Server Action, DB 연동, 로그인 기능을 하나의 사이트로 모았습니다.
        </p>
        <div className="mt-6 flex gap-2">
          <Link
            href="/notices"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            공지 보러가기
          </Link>
          <Link
            href="/notices/new"
            className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            글쓰기
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">최근 공지</h2>
          <Link href="/notices" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
            전체 보기 →
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {recent.map((n) => (
            <NoticeListItem key={n.id} notice={n} />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">둘러보기</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="rounded-lg border border-black/[.08] px-4 py-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-white/[.145] dark:hover:bg-indigo-950/40"
            >
              <p className="font-medium">{f.title}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
