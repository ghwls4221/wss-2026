// 공지 카테고리를 작은 뱃지로 보여주는 재사용 컴포넌트 (목록·상세에서 공통 사용)
const COLORS: Record<string, string> = {
  학사: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  행사: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  기타: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

export function CategoryBadge({ category }: { category: string }) {
  const color = COLORS[category] ?? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  return (
    <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${color}`}>{category}</span>
  );
}
