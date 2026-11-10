import Link from "next/link";

// app/about/page.tsx → 자동으로 "/about" 경로가 됩니다.
// 별도의 라우터 설정 파일 없이, 폴더 구조 자체가 URL 구조가 되는 것이
// Next.js App Router의 File-based Routing입니다.
export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-24 text-center">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        이 사이트에 대해
      </h1>
      <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
        웹서버보안프로그래밍 수업에서 매주 기능을 하나씩 붙여 만든 실습 사이트입니다.
        학과 공지 게시판에서 글을 쓰고, 학과 굿즈샵에서 장바구니에 담아 주문할 수 있어요.
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">정호진 · 중부대학교 정보보호학과</p>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
      >
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
}
