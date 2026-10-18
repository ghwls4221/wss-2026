import Link from "next/link";

// (과제 #1) app/about/page.tsx → "/about" 경로 (File-based Routing)
export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">About</h1>
      <p className="leading-7 text-zinc-600 dark:text-zinc-400">
        중부대학교 정보보호학과 정호진입니다. 웹서버보안프로그래밍 수업에서 주차별로 과제를 진행한 내용입니다.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        <li>과제 #1 (3주차): /about 페이지 추가, useState로 글자 수 카운터 컴포넌트 작성</li>
        <li>과제 #2 (4주차): 상품 목록·상세, 상품 추가 폼(Server Action), loading.tsx, shadcn Button</li>
        <li>과제 #3 (5주차): 공지사항에 카테고리·조회수 필드 추가, 목록 항목 컴포넌트 분리</li>
        <li>과제 #4 (6주차): MongoDB Atlas 연결, 스키마에 추가 필드 반영</li>
        <li>과제 #5 (7주차): 회원가입·로그인·로그아웃, 로그인 실패 시 /login?error=1</li>
      </ul>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
      >
        ← 홈으로 돌아가기
      </Link>
    </div>
  );
}
