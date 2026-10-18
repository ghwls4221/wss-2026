"use server";
// 이 파일의 함수들은 Server Action입니다. 클라이언트 컴포넌트에서
// 그냥 함수처럼 import해서 호출하면, Next.js가 자동으로 서버에
// 요청을 보내고 결과를 받아옵니다 — 별도의 API 엔드포인트를
// 직접 만들지 않아도 됩니다. (6주차 MongoDB CRUD에서 본격적으로 사용)

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { likeProduct as likeProductInDb, createProduct } from "@/lib/products";
import { createNotice } from "@/lib/notices";
import { createUser } from "@/lib/users";
import { NOTICE_CATEGORIES } from "@/models/Notice";
import { signIn, signOut } from "@/auth";

// (4주차 과제) 새 상품 추가 — 폼 + Server Action
// 브라우저의 required/maxLength는 개발자도구로 우회할 수 있으므로 서버에서 다시 검증합니다.
export async function createProductAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !description || name.length > 50 || description.length > 300) {
    throw new Error("상품명(50자 이내)과 설명(300자 이내)을 입력해주세요.");
  }

  const product = await createProduct({ name, description });
  revalidatePath("/products");
  redirect(`/products/${product.id}`);
}

export async function likeProductAction(id: string) {
  const newLikes = await likeProductInDb(id);
  // 이 경로를 다시 그리도록 Next.js에 알려줍니다 — 다른 탭/새로고침에서도
  // 최신 좋아요 수가 보이게 합니다.
  revalidatePath(`/products/${id}`);
  return newLikes;
}

// 4주차의 likeProductAction과 달리, 이 액션은 <form action={...}>에
// 직접 연결됩니다. 함수를 호출하는 자바스크립트 코드 없이도 폼이
// 제출되면 Next.js가 FormData를 담아 이 함수를 서버에서 실행합니다.
// 즉 이 페이지는 클라이언트 자바스크립트가 없어도 기본 동작이 가능합니다.
export async function createNoticeAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const categoryInput = String(formData.get("category") ?? "일반");
  // 정해진 카테고리 목록에 없는 값이 오면 "일반"으로 (조작된 요청 방어)
  const category = (NOTICE_CATEGORIES as readonly string[]).includes(categoryInput)
    ? categoryInput
    : "일반";

  if (!title || !author || !content) {
    throw new Error("제목, 작성자, 내용을 모두 입력해주세요.");
  }
  if (title.length > 100 || author.length > 30 || content.length > 2000) {
    throw new Error("입력 길이 제한을 초과했습니다.");
  }

  const notice = await createNotice({ title, author, content, category });
  revalidatePath("/notices");
  redirect(`/notices/${notice.id}`);
}

// 회원가입: 비밀번호를 해싱해 User 컬렉션에 저장한 뒤, 곧바로 로그인까지
// 이어서 처리합니다. signIn()이 성공하면 내부적으로 리다이렉트를 던지므로
// registerAction은 반환값을 따로 처리하지 않습니다.
export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    throw new Error("이름, 이메일, 비밀번호를 모두 입력해주세요.");
  }
  if (password.length < 8) {
    throw new Error("비밀번호는 8자 이상이어야 합니다.");
  }

  await createUser({ name, email, password });
  await signIn("credentials", { email, password, redirectTo: "/" });
}

// 로그인. Auth.js는 로그인 실패도 "에러를 던지는 방식"으로 알려줍니다.
// AuthError만 따로 잡아서 /login?error=1 로 돌려보내고, 그 외의 에러
// (Next.js의 리다이렉트 신호 포함)는 그대로 다시 던져야 합니다 — 여기서
// 삼켜버리면 로그인 성공 후 리다이렉트까지 막혀버립니다.
export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=1");
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
