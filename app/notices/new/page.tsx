import { createNoticeAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CharCountTextarea } from "@/components/CharCountTextarea";
import { NOTICE_CATEGORIES } from "@/models/Notice";

const inputClass =
  "rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent";

// Server Component + <form action={Server Action}>
// 글자 수 카운터(CharCountTextarea)만 Client Component로 분리했습니다.
export default function NewNoticePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 공지 작성</h1>
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor="author" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            작성자
          </label>
          <input id="author" name="author" type="text" required maxLength={30} className={inputClass} />
        </div>
        <CharCountTextarea id="content" name="content" label="내용" maxLength={2000} />
        <SubmitButton label="등록하기" />
      </form>
    </div>
  );
}
