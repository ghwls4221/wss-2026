# 웹서버보안프로그래밍 실습 — 공지사항 게시판 + 쇼핑몰 (정호진)

수업 레퍼런스 코드(3~11주차)에 과제로 직접 추가한 기능을 합친 실습 프로젝트입니다.
Next.js 16 (App Router) · MongoDB Atlas + Mongoose · Auth.js v5 · Vercel

## 실행
```bash
cp .env.local.example .env.local   # MONGODB_URI 채우기
npx auth secret                    # AUTH_SECRET 자동 생성
npm install
npm run dev
```

## Vercel 환경변수
- `MONGODB_URI`: Atlas 연결 문자열 (DB 이름 `websecprog`)
- `AUTH_SECRET`: `.env.local`에 생성된 값과 동일

## 주차별 과제

| 과제 | 주차 | 내용 |
|---|---|---|
| #1 | 3주차 | `/about`, useState 글자 수 카운터(`CharCountTextarea`), 홈 클릭 카운터(`ClickCounter`) |
| #2 | 4주차 | 상품 목록·상세(동적 라우팅), `loading.tsx`, 상품 추가 폼(Server Action) |
| #3 | 5주차 | 공지에 **카테고리·조회수** 필드 추가, `NoticeListItem`·`CategoryBadge` 컴포넌트 분리 |
| #4 | 6주차 | MongoDB Atlas 연동, 스키마에 추가 필드 반영, `error.tsx` |
| #5 | 7주차 | 회원가입·로그인·로그아웃(bcrypt, JWT), 로그인 실패 시 `/login?error=1` |
| #6 | 9주차 | 로그인해야 글쓰기(`proxy.ts` + Server Action 이중 확인), 본인·관리자만 삭제, role(`user`/`admin`) |
| #7 | 10주차 | 상품 가격·재고, 쿠키 기반 장바구니(가격은 쿠키에 저장하지 않고 매번 DB에서 조회) |
| #8 | 11주차 | 결제(주문 생성), 재고 원자적 감소(`$inc`), 본인 주문만 조회(남의 주문은 404) |

### 레퍼런스 코드와 합치면서 바꾼 점
- **상품 추가는 관리자 전용**: 4주차에는 누구나 추가할 수 있었지만, 9주차 RBAC 원칙에 맞춰 admin만 `/products/new`에 들어갈 수 있고 `createProductAction`에서도 다시 확인합니다. 가격·이모지·재고 입력칸을 추가했습니다.
- **조회수**: 상세 페이지는 `viewNotice()`로 조회수를 올리고, 삭제 권한 검사에는 조회수를 올리지 않는 `getNotice()`를 씁니다.
- **9주차 이전 글 호환**: 예전 글(`author` 텍스트만 있음)은 작성자 이름을 그대로 보여주고, 작성자 id가 없으므로 관리자만 삭제할 수 있습니다.

## 11주차 과제: SNS 버전으로 응용

쇼핑몰의 패턴을 SNS(게시판)에 그대로 옮기는 설계입니다. 이 중 **"내가 쓴 글"은 실제로 구현**했습니다.

| 쇼핑몰 | SNS로 옮기면 | 상태 |
|---|---|---|
| 상품 목록/상세 | 게시물 목록/상세 (`/notices`, `/notices/[id]`) | 구현됨 |
| 주문 생성 + 소유권 기반 조회(`/orders`) | **"내가 쓴 글"** (`/notices/mine`) — `getNoticesByAuthor(session.user.id)`처럼 로그인한 사용자 id를 조회 조건에 직접 넣어, 다른 사람 글은 애초에 조회되지 않음 | **구현됨** |
| 본인 주문만 상세 조회 | 본인 글만 삭제 (`deleteNoticeAction`에서 `authorId === session.user.id` 확인) | 구현됨 |
| 쿠키 기반 장바구니 | 로그인 없이 쓰는 **임시 저장(초안)** — 쿠키에는 제목·내용 초안만 두고, 게시할 때는 로그인 확인 후 작성자를 세션에서 채움 | 설계 |
| admin 예외 접근 | **신고된 게시물 처리** — 신고 수가 기준을 넘은 글을 admin만 숨김/삭제, 일반 사용자는 신고만 가능 | 설계 |

## 확인 체크리스트
- [ ] 로그아웃 상태로 `/notices/new`, `/notices/mine`, `/orders` 접속 → `/login`으로 이동
- [ ] 로그인 후 글쓰기 → 작성자에 내 이름, 카테고리·조회수 표시 → "내가 쓴 글"에 나타남
- [ ] 남의 글에는 삭제 버튼이 없음 / Atlas에서 내 계정 `role`을 `"admin"`으로 바꾸면 모든 글 삭제 가능, 상품 추가 가능
- [ ] 로그아웃 상태로 장바구니 담기·수량 변경·삭제 → 로그인 후 결제 → 주문 상세로 이동, 장바구니 비워짐
- [ ] 다른 계정으로 남의 주문 `/orders/<id>` 접근 → 404
- [ ] 주문 후 Atlas에서 해당 상품 `stock` 감소 확인
