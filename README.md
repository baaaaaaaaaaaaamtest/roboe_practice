# Roboe Practice
NestJS 기반 로봇 관리 REST API 프로젝트
## 설명

로봇의 상태를 등록, 조회, 수정, 삭제하고,
WebSocket을 통해 로봇의 실시간 상태를 수집·전달하는 간단한 로봇 상태 모니터링 시스템을 구현
---

## 설치 및 실행

### 주요버전
- nodejs :v22.17.1
- nestjs : 11.0.10
- docker : v28.3.3
- mongo : v7
- docker compose : v2.38.2


### 일반 환경

- npm install # 의존성 설치  
- npm run start # production 서버 실행
- npm run start:dev # 개발 서버 실행
- npm build : 프로젝트 빌드

### docker 환경

- docker-compose up -d 

---

## Base URL


### Endpoints

| 메소드 | 엔드포인트               | 설명                  | 요청 예시/Dto                |
|--------|-------------------------|----------------------|------------------------------|
| GET    | `/robots`               | 모든 로봇 목록 조회   |                              |
| GET    | `/robots/:id`           | 특정 로봇 조회        |                              |
| GET    | `/robots/:id/logs`      | 특정 로봇 로그 조회   |                              |
| POST   | `/robots`               | 로봇 생성            | `CreateRobotDto`             |
| PATCH  | `/robots/:id/status`    | 로봇 상태 업데이트    | `UpdateRobotStatusDto`       |
| DELETE | `/robots/:id`           | 로봇 삭제            |                              |


### Swagger 문서

- Swagger UI로 모든 엔드포인트를 시각적으로 확인할 수 있습니다.
- 서버 실행 후 `/api` 경로에서 접근  
  (예시: `http://localhost:3000/api`)

---

## 라이선스
이 프로젝트는 MIT 라이선스로 오픈소스 제공되며, 자유롭게 사용・수정・배포할 수 있습니다.  
