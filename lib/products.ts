// 4주차: 상품 목록/상세/좋아요 + (과제) 새 상품 추가
// 처음엔 메모리 배열이었지만, 배포 환경에서도 데이터가 유지되도록
// 6주차에 배운 MongoDB/Mongoose로 내부 구현을 교체했습니다.
// 함수 이름(getProducts/getProduct/likeProduct)은 4주차와 그대로입니다.

import { connectDB } from "./mongodb";
import { Product as ProductModel } from "@/models/Product";

export type Product = {
  id: string;
  name: string;
  description: string;
  likes: number;
};

type ProductDocLike = { _id: unknown; name: string; description: string; likes?: number };

function toProduct(doc: ProductDocLike): Product {
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description,
    likes: doc.likes ?? 0,
  };
}

// loading.tsx가 눈에 보이도록 약간의 지연을 둡니다 (4주차 과제: loading.tsx 확인).
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seedIfEmpty() {
  const count = await ProductModel.countDocuments();
  if (count > 0) return;
  await ProductModel.insertMany([
    { name: "정보보호학과 스티커", description: "노트북에 붙이는 학과 로고 스티커", likes: 4 },
    { name: "정보보호학과 후드티", description: "시험 기간 밤샘용 따뜻한 학과 후드티", likes: 7 },
    { name: "보안 체크리스트 노트", description: "비밀번호 해싱부터 XSS까지 정리한 공부 노트", likes: 2 },
  ]);
}

export async function getProducts(): Promise<Product[]> {
  await delay(600);
  await connectDB();
  await seedIfEmpty();
  const docs = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => toProduct(doc as unknown as ProductDocLike));
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await connectDB();
  try {
    const doc = await ProductModel.findById(id).lean();
    return doc ? toProduct(doc as unknown as ProductDocLike) : undefined;
  } catch {
    // ObjectId 형식이 아닌 id → "찾을 수 없음"으로 처리
    return undefined;
  }
}

export async function likeProduct(id: string): Promise<number> {
  await connectDB();
  try {
    // $inc: 읽고-더하고-저장하는 대신 DB에서 한 번에 1 증가 (동시에 눌러도 정확함)
    const doc = await ProductModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).lean();
    return (doc as unknown as ProductDocLike | null)?.likes ?? 0;
  } catch {
    return 0;
  }
}

// (4주차 과제) 새 항목을 추가하는 기능
export async function createProduct(input: { name: string; description: string }): Promise<Product> {
  await connectDB();
  const doc = await ProductModel.create(input);
  return toProduct(doc);
}
