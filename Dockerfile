# 베이스 이미지 설정 (Node.js 18)
FROM node:22-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 설치를 위한 package.json 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 소스 전체 복사
COPY . .

# 빌드 실행
RUN npm run build

# 실행 환경 변수 설정 (실행 시 덮어씌울 수 있음)
ENV PORT=3000

# 빌드된 js가 있는 dist 폴더로 시작
CMD ["node", "dist/main.js"]
