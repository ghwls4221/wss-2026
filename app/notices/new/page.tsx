import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createNoticeAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CharCountTextarea } from "@/components/CharCountTextarea";
import { NOTICE_CATEGORIES } from "@/models/Notice";

const inputClass =
  "rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent";

// proxy.ts가 이미 이 페이지를 로그인 필수로 막고 있지만, 페이지 자체도
// 세션을 한 번 더 확인합니다(심층 방어). 작성자는 입력받지 않고
// 로그인한 사람의 이름을 그대로 보여줄 뿐입니다.
export default async function NewNoticePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 공지 작성</h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        작성자: <span className="font-medium text-zinc-700 dark:text-zinc-300">{session.user.name}</span>
        {" "}
        (로그인한 계정 이름으로 자동 등록돼요)
      </p>
      <form action={createNoticeAction} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex w-32 flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              카테고리
            </label>
            <select id="category" name="category" defaultValue="일반" className={inputClass}>
              {NOTICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              제목
            </label>
            <input id="title" name="title" type="text" required maxLength={100} className={inputClass} />
          </div>
        </div>
        {/* (3주차 과제) useState 글자 수 카운터 — Client Component */}
        <CharCountTextarea id="content" name="content" label="내용" maxLength={2000} />
        <SubmitButton label="등록하기" />
      </form>
    </div>
  );
}
