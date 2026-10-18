import Link from "next/link";
import { getProducts } from "@/lib/products";

// Server Component에서 바로 await로 데이터를 가져옵니다.
// 끝날 때까지 Next.js는 같은 폴더의 loading.tsx를 대신 보여줍니다.
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-zinc-50">굿즈 샵</h1>
          <p className="text-sm text-zinc-500">마음에 드는 굿즈에 좋아요를 눌러주세요.</p>
        </div>
        <Link
          href="/products/new"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + 상품 추가
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <li key={p.id}>
            <Link
              href={`/products/${p.id}`}
              className="flex h-full flex-col gap-1 rounded-lg border border-black/[.08] px-5 py-4 transition-colors hover:border-indigo-300 dark:border-white/[.145]"
            >
              <p className="font-medium text-black dark:text-zinc-50">{p.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.description}</p>
              <p className="mt-auto pt-2 text-sm text-pink-600">♥ {p.likes}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
