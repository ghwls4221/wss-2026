import Link from "next/link";
import { createProductAction } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CharCountTextarea } from "@/components/CharCountTextarea";

// (4주차 과제) 새 상품 추가 — <form action={Server Action}>
export default function NewProductPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-6 px-8 py-16">
      <Link href="/products" className="text-sm text-zinc-500 hover:underline">
        ← 목록으로
      </Link>
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">새 상품 추가</h1>
      <form action={createProductAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            상품명
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={50}
            className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
          />
        </div>
        <CharCountTextarea id="description" name="description" label="설명" maxLength={300} rows={4} />
        <SubmitButton label="추가하기" />
      </form>
    </div>
  );
}
