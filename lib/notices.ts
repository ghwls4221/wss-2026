// 5주차의 in-memory 배열을 6주차에 실제 MongoDB 조회로 교체했습니다.
// 함수 이름(getNotices/getNotice/createNotice)은 5주차와 동일하게 유지하고,
// (과제) 카테고리·조회수 필드를 추가했습니다.

import { connectDB } from "./mongodb";
import { Notice as NoticeModel } from "@/models/Notice";

export type Notice = {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  views: number;
  createdAt: string;
};

// Mongoose 문서를 화면에서 쓰는 평범한 객체(Notice)로 변환합니다.
type NoticeDocLike = {
  _id: unknown;
  title: string;
  author: string;
  content: string;
  category?: string;
  views?: number;
  createdAt?: Date;
};

function toNotice(doc: NoticeDocLike): Notice {
  return {
    id: String(doc._id),
    title: doc.title,
    author: doc.author,
    content: doc.content,
    category: doc.category ?? "일반",
    views: doc.views ?? 0,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  };
}

// 컬렉션이 비어있을 때만 예시 데이터를 넣어줍니다.
async function seedIfEmpty() {
  const count = await NoticeModel.countDocuments();
  if (count > 0) return;

  await NoticeModel.insertMany([
    {
      title: "웹서버보안프로그래밍 개강 안내",
      author: "관리자",
      category: "학사",
      content: "2학기 웹서버보안프로그래밍 수업이 시작됩니다. 강의계획서를 확인해주세요.",
    },
    {
      title: "중간고사 프로젝트 발표 안내",
      author: "관리자",
      category: "학사",
      content: "10월 20일(화) 팀 프로젝트 발표와 개인 포트폴리오 데모가 있습니다.",
    },
    {
      title: "MongoDB 연동 완료",
      author: "관리자",
      category: "일반",
      content: "이번 주부터 공지사항 게시판이 실제 데이터베이스에 저장됩니다.",
    },
  ]);
}

export async function getNotices(): Promise<Notice[]> {
  await connectDB();
  await seedIfEmpty();
  const docs = await NoticeModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => toNotice(doc as unknown as NoticeDocLike));
}

// 상세 보기 — 조회할 때마다 조회수(views)를 1 올립니다.
// $inc는 DB에서 원자적으로 더하므로 여러 명이 동시에 열어도 숫자가 정확합니다.
export async function getNotice(id: string): Promise<Notice | undefined> {
  await connectDB();
  try {
    const doc = await NoticeModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    return doc ? toNotice(doc as unknown as NoticeDocLike) : undefined;
  } catch {
    // id가 MongoDB ObjectId 형식이 아니면 에러 → "찾을 수 없음"으로만 보여줍니다.
    return undefined;
  }
}

export async function createNotice(input: {
  title: string;
  author: string;
  content: string;
  category: string;
}): Promise<Notice> {
  await connectDB();
  const doc = await NoticeModel.create(input);
  return toNotice(doc);
}
