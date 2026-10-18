# 웹서버보안프로그래밍 실습 — 공지사항 게시판

수업 7주차 레퍼런스 코드를 바탕으로 한 실습 프로젝트입니다.
Next.js 16 (App Router) · MongoDB Atlas + Mongoose · Auth.js v5 (회원가입/로그인)

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
