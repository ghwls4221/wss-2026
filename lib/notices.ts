// 6주차의 MongoDB 조회 위에, 9주차부터 "누가 썼는가"가 추가됩니다.
// author(자유 입력 텍스트) 대신 authorId/authorName을 저장합니다 — 이 값은
// 사용자가 폼에 입력하는 게 아니라 로그인 세션에서 서버가 채워 넣습니다
// (lib/actions.ts의 createNoticeAction 참고).
// (과제) 카테고리·조회수 필드도 함께 다룹니다.

import { connectDB } from "./mongodb";
import { Notice as NoticeModel } from "@/models/Notice";

export type Notice = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: string;
  views: number;
  createdAt: string;
};

// Mongoose 문서를 화면에서 쓰는 평범한 객체(Notice)로 변환합니다.
type NoticeDocLike = {
  _id: unknown;
  title: string;
  content: string;
  authorId?: unknown;
  authorName?: string;
  author?: string; // 9주차 이전에 저장된 글은 author(텍스트)만 가지고 있습니다
  category?: string;
  views?: number;
  createdAt?: Date;
};

function toNotice(doc: NoticeDocLike): Notice {
  return {
    id: String(doc._id),
    title: doc.title,
    content: doc.content,
    authorId: doc.authorId ? String(doc.authorId) : "",
    authorName: doc.authorName ?? doc.author ?? "이름 없음",
    category: doc.category ?? "일반",
    views: doc.views ?? 0,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  };
}

// 9주차부터 예시 데이터를 자동으로 넣지 않습니다. 로그인한 진짜 사용자가
// 쓴 글만 보이고, 화면(app/notices/page.tsx)에서 빈 상태를 안내합니다.
export async function getNotices(): Promise<Notice[]> {
  await connectDB();
  const docs = await NoticeModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => toNotice(doc as unknown as NoticeDocLike));
}

// (11주차 과제 · SNS 응용) "내가 쓴 글" — 주문 내역과 같은 소유권 패턴입니다.
// 항상 로그인한 사용자의 id를 조회 조건에 넣어서, 다른 사람의 글은 애초에
// 조회되지 않게 합니다.
export async function getNoticesByAuthor(authorId: string): Promise<Notice[]> {
  await connectDB();
  try {
    const docs = await NoticeModel.find({ authorId }).sort({ createdAt: -1 }).lean();
    return docs.map((doc) => toNotice(doc as unknown as NoticeDocLike));
  } catch {
    return [];
  }
}

// 조회수를 올리지 않고 읽기만 합니다 (삭제 권한 검사 등에서 사용).
export async function getNotice(id: string): Promise<Notice | undefined> {
  await connectDB();
  try {
    const doc = await NoticeModel.findById(id).lean();
    return doc ? toNotice(doc as unknown as NoticeDocLike) : undefined;
  } catch {
    // id가 MongoDB ObjectId 형식이 아니면 findById가 에러를 던집니다.
    return undefined;
  }
}

// 상세 페이지용 — 열 때마다 조회수(views)를 1 올립니다.
// $inc는 DB에서 원자적으로 더하므로 여러 명이 동시에 열어도 숫자가 정확합니다.
export async function viewNotice(id: string): Promise<Notice | undefined> {
  await connectDB();
  try {
    const doc = await NoticeModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { returnDocument: "after" }
    ).lean();
    return doc ? toNotice(doc as unknown as NoticeDocLike) : undefined;
  } catch {
    return undefined;
  }
}

export async function createNotice(input: {
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
}): Promise<Notice> {
  await connectDB();
  const doc = await NoticeModel.create(input);
  return toNotice(doc as unknown as NoticeDocLike);
}

// 삭제는 아무나 호출할 수 있는 함수가 아닙니다 — 이 함수 자체는 그냥
// DB에서 지우기만 할 뿐이고, "지울 권한이 있는가"는 반드시 호출하는 쪽
// (lib/actions.ts의 deleteNoticeAction)에서 먼저 확인해야 합니다.
export async function deleteNotice(id: string): Promise<void> {
  await connectDB();
  await NoticeModel.findByIdAndDelete(id);
}
