import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { createProductAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CharCountTextarea } from "@/components/CharCountTextarea";

const inputClass =
  "rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent";

// (4주차 과제 → 9주차 권한 적용) 새 상품 추가 — 관리자 전용
// proxy.ts가 비로그인 접근을 막고, 이 페이지는 admin이 아니면 404로 존재 자체를 숨깁니다.
// 실제 저장 권한 검사는 createProductAction 안에서 한 번 더 합니다(심층 방어).
export default async function NewProductPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "admin") {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <Link href="/products" className="text-sm text-zinc-500 hover:underline">
        ← 목록으로
      </Link>
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 상품 추가 (관리자)</h1>
      <form action={createProductAction} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex w-20 flex-col gap-1.5">
            <label htmlFor="emoji" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              이모지
            </label>
            <input id="emoji" name="emoji" type="text" maxLength={8} placeholder="📦" className={inputClass} />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              상품명
            </label>
            <input id="name" name="name" type="text" required maxLength={50} className={inputClass} />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="price" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              가격 (원)
            </label>
            <input id="price" name="price" type="number" required min={0} step={1} className={inputClass} />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="stock" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              재고 (개)
            </label>
            <input id="stock" name="stock" type="number" required min={0} step={1} className={inputClass} />
          </div>
        </div>
        <CharCountTextarea id="description" name="description" label="설명" maxLength={300} rows={4} />
        <SubmitButton label="추가하기" />
      </form>
    </div>
  );
}
