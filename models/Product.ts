import { Schema, model, models } from "mongoose";

// 4주차에는 메모리 배열이었던 상품 데이터를 MongoDB에 저장합니다.
// Vercel(서버리스)은 요청마다 서버가 바뀔 수 있어 메모리 배열은 새로고침하면
// 사라지기 때문에, 배포 환경에서도 유지되도록 DB로 옮겼습니다.
const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    description: { type: String, required: true, trim: true, maxlength: 300 },
    likes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", productSchema);
