# Architecture 구조도

## 디렉터리 구조 설명

   src  
   ├── app.module.ts  
   ├── main.ts  
   ├── robot    
   │   ├── dto  
   │   │   ├── createRobot.dto.ts  
   │   │   └── updateRobotStatus.dto.ts  
   │   ├── schemas  
   │   │   ├── robot.schema.ts  
   │   │   └── robotLog.schema.ts  
   │   ├── robot.controller.ts  
   │   ├── robot.module.ts  
   │   ├── robot.repository.ts  
   │   └── robot.service.ts  
   ├── socket  
   │   ├── dto  
   │   │   ├── createRobotLog.dto.ts  
   │   │   └── updateRobot.dto.ts  
   │   ├── schemas  
   │   │   └── robotLog.schema.ts  
   │   ├── webSocket.module.ts  
   │   ├── webSocket.repository.ts  
   │   ├── webSocket.service.ts  
   │   └── webSocket.ts  
   └── utils  
       ├──allException.filter.ts  
       ├──wsAllExceiption.filter.ts  


## 각 모듈의 역할 및 의존 관계 기술

app.module.ts: 애플리케이션의 루트 모듈로, RobotModule과 WebSocketModule을 포함하여 전체 애플리케이션의 설정을 관리합니다.

main.ts: 애플리케이션의 진입점으로, NestJS 애플리케이션을 부트스트랩하고 Swagger API 문서를 설정합니다.

robot:

robot.controller.ts: 로봇 관련 HTTP 요청을 처리하는 컨트롤러로, 로봇 생성, 조회, 업데이트 및 삭제 기능을 제공합니다.  
robot.module.ts: 로봇 관련 모듈로, RobotController, RobotService, RobotRepository를 포함합니다.  
robot.repository.ts: MongoDB와의 데이터 상호작용을 담당하며, 로봇 데이터의 CRUD 작업을 수행합니다.  
robot.service.ts: 비즈니스 로직을 처리하며, RobotRepository를 통해 데이터베이스와 상호작용합니다.  
dto: 데이터 전송 객체로, 로봇 생성 및 상태 업데이트에 필요한 데이터 구조를 정의합니다.  
schemas: MongoDB 스키마 정의 파일로, 로봇 및 로봇 로그의 데이터 구조를 정의합니다.  

socket:  
webSocket.module.ts: WebSocket 관련 모듈로, WebSocketService와 WebSocketRepository를 포함합니다.  
webSocket.repository.ts: WebSocket을 통해 로봇 로그를 생성하고 업데이트하는 데이터베이스 작업을 수행합니다.  
webSocket.service.ts: WebSocket 메시지를 처리하고 로봇 상태를 업데이트하는 비즈니스 로직을 포함합니다.  
dto: WebSocket 메시지와 관련된 데이터 전송 객체를 정의합니다.  
schemas: WebSocket 로그와 관련된 MongoDB 스키마를 정의합니다.  

utils:  
allException.filter.ts: 모든 예외를 처리하는 필터로, HTTP 요청에서 발생하는 예외를 처리합니다.  
wsAllExceiption.filter.ts: WebSocket에서 발생하는 예외를 처리하는 필터로, 클라이언트에게 예외 메시지를 전송합니다.  