import { connectDB } from "@/lib/mongodb";
import { Product as ProductModel } from "@/models/Product";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  stock: number;
};

type ProductDoc = {
  _id: unknown;
  name: string;
  description: string;
  price: number;
  emoji: string;
  stock: number;
};

function toProduct(doc: ProductDoc): Product {
  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    emoji: doc.emoji,
    stock: doc.stock,
  };
}

// 데모용 초기 상품 데이터입니다. 컬렉션이 비어 있을 때만 들어갑니다.
const SEED_PRODUCTS = [
  { name: "아이폰", description: "6.1인치 디스플레이, 128GB 스마트폰", price: 1250000, emoji: "📱", stock: 20 },
  { name: "아이패드", description: "11인치 태블릿, 필기와 영상 강의용", price: 799000, emoji: "📲", stock: 15 },
  { name: "맥북", description: "13인치 노트북, 과제와 개발용", price: 1590000, emoji: "💻", stock: 10 },
  { name: "충전기", description: "USB-C 고속 충전기 (35W)", price: 59000, emoji: "🔌", stock: 50 },
  { name: "노트북 거치대", description: "목·어깨 건강을 지키는 알루미늄 거치대", price: 32000, emoji: "🗂️", stock: 30 },
];

// 상품 카탈로그는 (공지사항과 달리) 사용자가 아니라 운영자가 채워 넣는
// 데이터입니다. 그래서 9주차에서 없앤 "자동 시드"를 여기서는 다시
// 씁니다 — 컬렉션이 비어있으면 데모 상품으로 자동 채웁니다. 실제
// 서비스라면 관리자 도구나 별도 시드 스크립트가 이 역할을 대신합니다.
async function seedIfEmpty() {
  const count = await ProductModel.countDocuments();
  if (count === 0) {
    await ProductModel.insertMany(SEED_PRODUCTS);
  }
}

export async function getProducts(): Promise<Product[]> {
  await connectDB();
  await seedIfEmpty();
  const docs = await ProductModel.find().sort({ createdAt: 1 }).lean<ProductDoc[]>();
  return docs.map(toProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  await connectDB();
  try {
    const doc = await ProductModel.findById(id).lean<ProductDoc | null>();
    return doc ? toProduct(doc) : null;
  } catch {
    // 형식이 잘못된 id(예: 조작된 URL)로 조회하면 Mongoose가 CastError를
    // 던집니다. 존재하지 않는 상품과 동일하게 처리합니다.
    return null;
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  await connectDB();
  try {
    const docs = await ProductModel.find({ _id: { $in: ids } }).lean<ProductDoc[]>();
    return docs.map(toProduct);
  } catch {
    return [];
  }
}

// 11주차: 주문이 만들어지면 그만큼 재고를 줄입니다. $inc는 "현재 값을
// 서버가 원자적으로 증감"하는 연산이라, 여러 사용자가 동시에 같은
// 상품을 주문해도 두 요청이 서로의 감소분을 덮어쓰지 않습니다(먼저
// 읽은 값에 -qty를 계산해 다시 쓰는 방식이었다면 경쟁 상태가 생겼을
// 것입니다).
export async function decrementStock(productId: string, qty: number) {
  await connectDB();
  await ProductModel.updateOne({ _id: productId }, { $inc: { stock: -qty } });
}

// (4주차 과제 → 9주차 권한 적용) 새 상품 추가.
// 상품 카탈로그는 운영자가 채우는 데이터이므로, 이 함수를 부르는 쪽
// (lib/actions.ts의 createProductAction)에서 반드시 admin인지 먼저 확인합니다.
export async function createProduct(input: {
  name: string;
  description: string;
  price: number;
  emoji: string;
  stock: number;
}): Promise<Product> {
  await connectDB();
  const doc = await ProductModel.create(input);
  return toProduct(doc.toObject() as ProductDoc);
}
