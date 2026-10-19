"use client";
// useState로 클릭 횟수를 기억하는 Client Component입니다.
// 버튼을 누를 때마다 브라우저에서 화면이 바뀌어야 하므로 "use client"가 필요합니다.

import { useState } from "react";

export function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-black/[.08] px-4 py-3 dark:border-white/[.145]">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">눌러보세요</span>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        클릭 {count}
      </button>
      <button
        onClick={() => setCount(0)}
        disabled={count === 0}
        className="text-xs text-zinc-500 underline underline-offset-4 disabled:opacity-40 dark:text-zinc-400"
      >
        초기화
      </button>
    </div>
  );
}
