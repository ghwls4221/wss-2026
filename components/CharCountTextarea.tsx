"use client";
// (3주차 과제) useState를 쓰는 Client Component 직접 작성
// 입력한 글자 수를 실시간으로 세어 "12 / 300자"처럼 보여주는 textarea입니다.
// 타이핑할 때마다 화면이 바뀌어야 하므로 브라우저 상태(useState)가 필요하고,
// 그래서 "use client"로 Client Component 경계를 표시했습니다.
// 폼 제출은 부모 <form action={...}>(Server Action)이 그대로 처리합니다.

import { useState } from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  maxLength: number;
  rows?: number;
};

export function CharCountTextarea({ id, name, label, maxLength, rows = 6 }: Props) {
  const [text, setText] = useState("");
  const nearLimit = text.length > maxLength * 0.9;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <span className={`text-xs ${nearLimit ? "text-red-500" : "text-zinc-500"}`}>
          {text.length} / {maxLength}자
        </span>
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required
        maxLength={maxLength}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="resize-none rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
      />
    </div>
  );
}
