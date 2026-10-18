import Link from "next/link";

// app/page.tsx는 "/" 경로를 담당합니다 (Server Component).
const LINKS = [
  { href: "/notices", label: "/notices — 공지사항 게시판 (카테고리, 조회수 추가)" },
  { href: "/notices/new", label: "/notices/new — 공지 작성 (글자 수 카운터)" },
  { href: "/products", label: "/products — 상품 목록 + 상품 추가" },
  { href: "/register", label: "/register — 회원가입 (bcrypt 해싱)" },
  { href: "/login", label: "/login — 로그인 (Auth.js)" },
  { href: "/about", label: "/about — 주차별 과제 정리" },
  { href: "/api/hello", label: "/api/hello — Route Handler JSON" },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 py-24 px-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          정호진의 웹서버보안프로그래밍 실습
        </h1>
        <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
          3주차부터 7주차까지 과제(#1~#5)를 진행한 프로젝트입니다.
          공지사항 게시판과 상품 페이지는 MongoDB에 저장되고, 회원가입/로그인은 Auth.js를 사용합니다.
        </p>

        <div className="flex flex-col gap-2 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
