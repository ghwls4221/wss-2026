import { Schema, model, models } from "mongoose";

// 공지 카테고리 — 폼의 <select>와 스키마의 enum이 같은 목록을 씁니다.
export const NOTICE_CATEGORIES = ["일반", "학사", "행사", "기타"] as const;

// Mongoose 스키마 — MongoDB는 원래 스키마가 없는(schemaless) DB지만,
// 애플리케이션 코드에서는 이렇게 스키마를 정의해두는 것이 실수를 줄이고
// 타입 안전성을 얻는 실무 표준입니다.
const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    author: { type: String, required: true, trim: true, maxlength: 30 },
    content: { type: String, required: true, maxlength: 2000 },
    // (5·6주차 과제) 추가한 필드 — 카테고리와 조회수
    // default가 있으므로 필드 추가 전에 저장된 기존 문서도 안전하게 읽힙니다.
    category: { type: String, enum: NOTICE_CATEGORIES, default: "일반" },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true } // createdAt / updatedAt 필드를 자동으로 추가
);

// Next.js 개발 모드의 hot-reload로 이 파일이 여러 번 로드되면
// model("Notice", ...)을 중복 정의하려다 에러가 납니다.
// models.Notice가 이미 있으면 그것을 재사용합니다.
export const Notice = models.Notice || model("Notice", noticeSchema);
