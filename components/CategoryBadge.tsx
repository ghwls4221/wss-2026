// 공지 카테고리를 [학사] 처럼 작게 보여주는 컴포넌트 (목록·상세에서 같이 사용)
export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="shrink-0 rounded bg-black/[.06] px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
      {category}
    </span>
  );
}
