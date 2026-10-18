// (3주차 과제) app/about/page.tsx → "/about" (File-based Routing)
const WEEKS = [
  { week: "3주차", items: ["App Router 폴더 구조 = URL", "/about 페이지", "useState 글자 수 카운터 (Client Component)", "Vercel 배포"] },
  { week: "4주차", items: ["동적 라우팅 /products/[id]", "loading.tsx 스켈레톤", "Server Action 좋아요·상품 추가", "Route Handler /api/hello", "shadcn/ui Button"] },
  { week: "5주차", items: ["공지 목록·상세·작성", "카테고리·조회수 필드 추가", "NoticeListItem·CategoryBadge 컴포넌트 분리", "useFormStatus 제출 버튼"] },
  { week: "6주차", items: ["MongoDB Atlas + Mongoose 연동", "스키마에 추가 필드 반영", ".env.local로 접속 정보 관리", "error.tsx로 안전한 에러 화면"] },
  { week: "7주차", items: ["회원가입 (bcrypt 해싱)", "Auth.js Credentials 로그인", "JWT 세션 쿠키", "로그인 실패 시 /login?error=1"] },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">호진 보드 소개</h1>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          중부대학교 정보보호학과 정호진이 웹서버보안프로그래밍 수업에서 주차별로 만든 기능을 한
          사이트에 모은 실습 프로젝트입니다.
        </p>
      </div>
      <ol className="flex flex-col gap-4">
        {WEEKS.map((w) => (
          <li key={w.week} className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">{w.week}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {w.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </main>
  );
}
