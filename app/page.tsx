import Link from "next/link";

// app/page.tsx는 "/" 경로를 담당합니다 (File-based Routing).
// "use client"가 없으므로 기본값인 Server Component입니다.
const LINKS = ["/notices", "/products", "/register", "/about", "/api/hello"];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 py-24 px-8 text-center">
        <span className="rounded-full bg-black/[.06] px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          Server Component
        </span>

        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          웹서버보안프로그래밍 — 정호진
        </h1>
        <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
          3주차부터 7주차까지 수업에서 배운 기능을 하나씩 붙여 가며 만든 프로젝트입니다.
          공지사항 게시판과 상품 페이지는 MongoDB에 저장되고, 회원가입한 뒤 로그인할 수 있습니다.
        </p>

        <div className="flex flex-col gap-3 text-sm">
          {LINKS.map((href) => (
            <Link
              key={href}
              href={href}
              className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
            >
              {href} →
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
