# springcomics-client
 <p>공부한 것을 만화로 그리며 복습하려 만든 웹툰 연재 웹 페이지 입니다.</p>

## 🚀 기술 스택
### ⚡백엔드

[백엔드 Repo](https://github.com/spcotoon/springcomics-server)

<div>
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Spring JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white"> 
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"> 
<img src="https://img.shields.io/badge/intelli j-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
</div>

### ⚡인프라
<div>
  <img src="https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/AWS RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
  <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
</div>

### ⚡도구
<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
</div>

### ⚡프론트엔드
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">  
  <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
</div>


<br/>

## 💻 프로젝트 소개

### ⚡기간
2025-01-05 ~ 2025-02-11

 <br/>

### ⚡주요기능(v1)

| 역할 | 기능 |
| ----- | ----- |
|유저|로그인 후 만화를 열람하고 댓글을 작성할 수 있습니다.|
|작가|관리자에게 아이디를 부여받아 만화를 연재할 수 있습니다.|
|관리자|유저, 작가, 작품, 댓글 목록을 확인하고 삭제할 수 있습니다. 작품 정보를 수정할 수 있습니다.|
|회원가입|Google의 SMTP 서버를 사용하여 JavaMailSender로 인증코드 메일 전송|
|로그인|jwt토큰을 발급 받고 토큰을 확인하는 커스텀 필터가 포함된 시큐리티 통과|
|검색|작품 제목, 작가명 검색|
|페이지네이션|Slice 인터페이스로 메인 웹툰 리스트는 스크롤식, PagedModel 인터페이스로 각 작품, 댓글은 버튼식 페이징|
|이미지 업로드|presigned-url을 발급하여 s3 업로드|
|redux-persist|로그인 유저 정보 전역관리|

 <br/>

### ⚡스크린샷

| 유저 페이지 | 작가 페이지 | 어드민 페이지 |
| ----- | ----- | ----- |
|![image](https://github.com/user-attachments/assets/63f91eb0-7fb3-4409-a87f-b7cca6cebbab)|![image](https://github.com/user-attachments/assets/f8761566-e8e1-4dd0-b697-cbc14d63c9a4)|![image](https://github.com/user-attachments/assets/0855f479-a164-4b09-97a9-654c287b6489)|

 <br/>

### ⚡프로젝트 후기


- 스프링 시큐리티
  - 학원 파이널 프로젝트때 써보려다 어떻게 다루는지 몰라서 고생했던 기억이...
  - 지금도 어렵지만 UsernamePasswordAuthenticationToken 으로 아이디, 패스워드 확인
  - 필터 통과시 SecurityContextHolder에 유저를 담아 컨트롤러에 보내 사용자 확인이 필요한 기능에서 활용
  - cors 설정 등 알아갈수록 편리한 친구... 그래도 아직은 어색한 관계...
  - 작가와 유저 각각의 UserDetails를 사용하고 싶었지만 두개를 만들어 놓으니 스프링이 무엇을 주입할지 몰라서 아무것도 안써버리는 선택을 하던데
  - 빈 이름 명시해주기, 필터체인 각각 만들어 순서 나누기 등 구글링하여 여러 방법을 시도해봤으나 아직 어색한 관계로 협의가 잘 안되어
  - 우선은 얄팍한 대안으로 작가 전용 아이디 도메인명을 사용해 유저 아이디와 구분하여 한 UserDetails를 같이 쓰고 있습니다...

- Spring Data JPA & Querydsl
  - 인프런 김영한 JPA 시리즈를 수강하며 조금은 가까워졌을까
  - 데이터를 조회하는데 테이블 3개가 필요하여 레이지로딩으로 한번에 쿼리가 6개가 나간다.
  - 그냥 쓰면 어떻게 날뛸지 모르는 JPA를 Querydsl로 진정시키니 2개로 줄어들었다.(fetch join..)
  - 1개로 줄이지 못한것은 DTO에 List를 담아야하는데 쿼리를 어떻게 짜야할지 몰라서 리스트 따로 나머지 따로 해서 두번..
  - JPA를 쓰고싶다면 SQL 매우 잘 알아야 통제가 되겠다.
  - 학원 2차 프로젝트는 서블릿+JSP+마이바티스를 사용했는데 JPA가 다루기 더 까다롭겠지만
  - 어떤 DB에든 문법 수정 없이 붙힐 수 있다는 점과 테이블을 객체처럼 다루고, 간단한 CRUD는 메서드로 가능한 점은 큰 장점으로 느껴진다..
 
- 다양한 예외를 직접 커스텀한 클래스로 처리하고 응답.
  - 예외별로 필요한 필드 검증 메시지를 관리하고, 각 예외에 맞는 HTTP 상태 코드를 반환할 수 있어 다루기 매우 편리했습니다.
  - 인프런 호돌맨 강의가 많은 참고가 되었다.
  - 내가 만든 예외 클래스를 던져도 시큐리티가 직접 응답하는 예외에 대한 커스텀은 v2에 구현하는 것으로...
  ```java
  /**
  * 안쓰면 서운한 ``` 마크다운
  */
  public abstract class SpringComicsException extends RuntimeException {

    public final Map<String, String> validation = new HashMap<>();

    public SpringComicsException(String message) {
        super(message);
    }

    public SpringComicsException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract int getStatusCode();

    public void addValidation(String fieldName, String message) {
        validation.put(fieldName, message);
    }

  ```

- AWS 입문
  - RDS, EC2 만들고 스프링부트 빌드하고 로드밸런서에 연결하고 그걸 또 Route 53으로 연결
  - S3 하나엔 웹툰 이미지 PUT 또 하나엔 리액트 빌드파일 업로드하고 cloudFront 연결하고 그걸 또 Route 53으로 연결
  - 두 줄로 끝났지만 과정은 눈과 머리가 많이 아팠다.
  - 리눅스 환경변수에 띄어쓰기나 특수문자를 읽는 방식을 잘 몰라서 DB, SMTP 환경변수 주입을 제대로 못해줘서 서버 스타트부터 해매고
  - 서버 실행은 됐는데 프론트에서 요청을 보내보면 502에러에 로드밸런서의 헬스체크도 매우 아픔...
  - 나중에 만화로 회고록을 더 자세히 그려보겠지만 원인은 허무하게도 포트번호가 문제였다. 
  - 로드밸런서는 80호실에 건강하냐고 물어보는데 부트는 8080호실에 있으니 대화가 안됐던것

- v2엔 어떤 업데이트가?
  - [유저] 내가 쓴 댓글 목록
    - 사실 아래 ERD를 보면 유저와 댓글테이블이 연결이 안돼있다. 물론 유저명이 유니크해서 연결 안해도 유저명으로 댓글 조회하면 되지만 어떤 방식이든 내가 쓴 글 조회는 추가하기
    - 내가 쓴 글 삭제 버튼

  - [유저] 별점, 관심 웹툰
    - 웹툰 각 화에 표시된 ⭐9.77 별점은 하드코딩 상태.
    - 별점, 관심 테이블 추가 

  - [유저, 작가] 결제 기능
    - 추후 결제 기능도 추가 (포폴용 사이트니 데모모듈로..)
    - 유저는 네이버웹툰 쿠키처럼 웹툰 열람을 포인트를 구매하여 열람하도록 하고 판매액의 일부는 작가에게 나머지는 관리자에게 증가되도록
    - 지금 미숙한 트랜잭션 공부를 많이 해야...

  - [관리자] NEW, HOT, 통계
    - 조회 소팅을 더욱 세분화
    - 월별 결제, 작품별 조회수 등 통계 분석 페이지
    - NEW, HOT 버튼 관리
   
- 마치며...
  - 이번 프로젝트에서 열린 확장과 닫힌 변경에 신경쓰려 했지만 에러를 정신없이 고치다보면 확장은 닫히고 변경은 열려있다...
  - 테스트코드를 작성하면서 만드려 했으나 정해진 기간에 끝내려다 보니 사실상 건너 뛰었다.
  - v2 작업 전에 v1 코드부터 테스트 코드 작성하면서 리팩토링 해봐야겠다. 이때에 OCP공부가 많이 될듯...
  - v2 작업에 들어가기 전에 또 다른 간단 게시판 프로젝트를 하나 더 만들어서 배포 공부도 해보고
  - 특히 AWS 강의중에 부하테스트 강의가 있던데 다른 프로젝트로 트래픽 공부도 한 뒤 v2로 들어가봐야겠다. (솔직한 심정으로 이미 배포한 지금 프로젝트는 이력서에도 링크하고 만화도 올릴건데 당분간은 얌전히 냅두고싶다..)
  - 이번엔 혼자 작업해서 좀 막 만들었지만 깃, 깃헙 협업, CS, 자바, 레디스, 도커, 리눅스, 데이터베이스 공부좀 많이많이 해야겠다. 그리고 공부하면 또 공부할게 늘어나겠지 몸이 두개였으면..

- **감사합니다!!**

 <br/>

### ⚡아키텍쳐
![image](https://github.com/user-attachments/assets/cfb38bb8-7195-4216-83e5-3ab86212b4e0)

### ⚡ERD
![image](https://github.com/user-attachments/assets/0c154722-a516-4c53-bc0f-01264492176a)

