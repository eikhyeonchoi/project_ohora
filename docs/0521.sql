-- 매뉴얼
DROP TABLE IF EXISTS manual RESTRICT;

-- 제품
DROP TABLE IF EXISTS product RESTRICT;

-- 제품 대분류
DROP TABLE IF EXISTS large_category RESTRICT;

-- 제품 소분류
DROP TABLE IF EXISTS small_category RESTRICT;

-- 매뉴얼 댓글
DROP TABLE IF EXISTS manual_cmt RESTRICT;

-- 리뷰
DROP TABLE IF EXISTS review RESTRICT;

-- 제품만족도
DROP TABLE IF EXISTS satisfy RESTRICT;

-- 리뷰 댓글
DROP TABLE IF EXISTS review_cmt RESTRICT;

-- 회원
DROP TABLE IF EXISTS member RESTRICT;

-- 제조사
DROP TABLE IF EXISTS manufacturer RESTRICT;

-- 자유게시판
DROP TABLE IF EXISTS fboard RESTRICT;

-- 자유게시판 댓글
DROP TABLE IF EXISTS fboard_cmt RESTRICT;

-- 고객문의
DROP TABLE IF EXISTS question RESTRICT;

-- 고객문의유형
DROP TABLE IF EXISTS question_type RESTRICT;

-- 고객문의답변
DROP TABLE IF EXISTS answer RESTRICT;

-- 공지사항
DROP TABLE IF EXISTS notice RESTRICT;

-- 자주묻는질문
DROP TABLE IF EXISTS faq RESTRICT;

-- 질문카테고리
DROP TABLE IF EXISTS faq_type RESTRICT;

-- 팁
DROP TABLE IF EXISTS tip RESTRICT;

-- 팁 히스토리
DROP TABLE IF EXISTS tip_history RESTRICT;

-- 제품 첨부파일
DROP TABLE IF EXISTS product_file RESTRICT;

-- 리뷰 첨부파일
DROP TABLE IF EXISTS review_file RESTRICT;

-- 매뉴얼 첨부파일
DROP TABLE IF EXISTS manual_file RESTRICT;

-- 자게 첨부파일
DROP TABLE IF EXISTS fboard_file RESTRICT;

-- 구성품
DROP TABLE IF EXISTS component RESTRICT;

-- 매뉴얼댓글추천
DROP TABLE IF EXISTS manual_rcm RESTRICT;

-- 리뷰댓글추천
DROP TABLE IF EXISTS review_rcm RESTRICT;

-- 자유게시판댓글 추천
DROP TABLE IF EXISTS fboard_rcm RESTRICT;

-- 주의사항
DROP TABLE IF EXISTS precautions RESTRICT;

-- 임시 테이블
DROP TABLE IF EXISTS question_file RESTRICT;

-- 임시 테이블2
DROP TABLE IF EXISTS answer_file RESTRICT;

-- 구성품2
DROP TABLE IF EXISTS basic RESTRICT;

-- 메뉴얼 페이지 타입
DROP TABLE IF EXISTS manual_type RESTRICT;

-- 매뉴얼
CREATE TABLE manual (
  manual_no  INTEGER     NOT NULL, -- 메뉴얼번호
  product_no INTEGER     NOT NULL, -- 제품번호
  cnt        INTEGER     NULL     DEFAULT 0, -- 조회수
  name       VARCHAR(50) NOT NULL  -- 제목
);

-- 매뉴얼
ALTER TABLE manual
  ADD CONSTRAINT PK_manual -- 매뉴얼 기본키
    PRIMARY KEY (
      manual_no -- 메뉴얼번호
    );

ALTER TABLE manual
  MODIFY COLUMN manual_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제품
CREATE TABLE product (
  product_no INTEGER     NOT NULL, -- 제품번호
  sctg_no    INTEGER     NOT NULL, -- 제품소분류번호
  manufac_no INTEGER     NOT NULL, -- 제조사번호
  name       VARCHAR(50) NOT NULL  -- 제품명
);

-- 제품
ALTER TABLE product
  ADD CONSTRAINT PK_product -- 제품 기본키
    PRIMARY KEY (
      product_no -- 제품번호
    );

-- 제품 유니크 인덱스
CREATE UNIQUE INDEX UIX_product
  ON product ( -- 제품
    name ASC -- 제품명
  );

ALTER TABLE product
  MODIFY COLUMN product_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제품 대분류
CREATE TABLE large_category (
  lctg_no INTEGER     NOT NULL, -- 제품대분류번호
  name    VARCHAR(50) NOT NULL  -- 상위 카테고리 이름
);

-- 제품 대분류
ALTER TABLE large_category
  ADD CONSTRAINT PK_large_category -- 제품 대분류 기본키
    PRIMARY KEY (
      lctg_no -- 제품대분류번호
    );

-- 제품 대분류 유니크 인덱스
CREATE UNIQUE INDEX UIX_large_category
  ON large_category ( -- 제품 대분류
    name ASC -- 상위 카테고리 이름
  );

ALTER TABLE large_category
  MODIFY COLUMN lctg_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제품 소분류
CREATE TABLE small_category (
  sctg_no INTEGER     NOT NULL, -- 제품소분류번호
  lctg_no INTEGER     NOT NULL, -- 제품대분류번호
  name    VARCHAR(50) NOT NULL  -- 하위 카테고리 이름
);

-- 제품 소분류
ALTER TABLE small_category
  ADD CONSTRAINT PK_small_category -- 제품 소분류 기본키
    PRIMARY KEY (
      sctg_no -- 제품소분류번호
    );

-- 제품 소분류 유니크 인덱스
CREATE UNIQUE INDEX UIX_small_category
  ON small_category ( -- 제품 소분류
    name ASC -- 하위 카테고리 이름
  );

ALTER TABLE small_category
  MODIFY COLUMN sctg_no INTEGER NOT NULL AUTO_INCREMENT;

-- 매뉴얼 댓글
CREATE TABLE manual_cmt (
  m_cmt_no  INTEGER  NOT NULL, -- 매뉴얼 댓글 번호
  manual_no INTEGER  NOT NULL, -- 메뉴얼번호
  member_no INTEGER  NOT NULL, -- 회원 번호
  conts     TEXT     NOT NULL, -- 내용
  cdt       DATETIME NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  parent_id INTEGER  NOT NULL, -- 부모 번호
  depth     INTEGER  NOT NULL  -- 단계
);

-- 매뉴얼 댓글
ALTER TABLE manual_cmt
  ADD CONSTRAINT PK_manual_cmt -- 매뉴얼 댓글 기본키
    PRIMARY KEY (
      m_cmt_no -- 매뉴얼 댓글 번호
    );

ALTER TABLE manual_cmt
  MODIFY COLUMN m_cmt_no INTEGER NOT NULL AUTO_INCREMENT;

-- 리뷰
CREATE TABLE review (
  rv_no      INTEGER     NOT NULL, -- 리뷰 번호
  product_no INTEGER     NOT NULL, -- 제품 번호
  member_no  INTEGER     NOT NULL, -- 회원 번호
  name       VARCHAR(50) NOT NULL, -- 리뷰명
  conts      TEXT        NOT NULL, -- 리뷰 내용
  cdt        DATETIME    NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  cnt        INTEGER     NULL     DEFAULT 0 -- 리뷰 조회수
);

-- 리뷰
ALTER TABLE review
  ADD CONSTRAINT PK_review -- 리뷰 기본키
    PRIMARY KEY (
      rv_no -- 리뷰 번호
    );

ALTER TABLE review
  MODIFY COLUMN rv_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제품만족도
CREATE TABLE satisfy (
  stf_no     INTEGER NOT NULL, -- 만족도 정보 번호
  product_no INTEGER NOT NULL, -- 제품번호
  member_no  INTEGER NOT NULL, -- 회원 번호
  level      DOUBLE  NOT NULL, -- 사용 난이도
  understand DOUBLE  NOT NULL, -- 사용설명서 이해도
  dgn        DOUBLE  NOT NULL, -- 제품 디자인
  as_stf     DOUBLE  NOT NULL, -- A/S 만족도
  useful     DOUBLE  NOT NULL, -- 편의성
  price_stf  DOUBLE  NOT NULL  -- 가격 만족도
);

-- 제품만족도
ALTER TABLE satisfy
  ADD CONSTRAINT PK_satisfy -- 제품만족도 기본키
    PRIMARY KEY (
      stf_no -- 만족도 정보 번호
    );

ALTER TABLE satisfy
  MODIFY COLUMN stf_no INTEGER NOT NULL AUTO_INCREMENT;

-- 리뷰 댓글
CREATE TABLE review_cmt (
  rv_cmt_no INTEGER  NOT NULL, -- 리뷰 댓글 번호
  member_no INTEGER  NOT NULL, -- 회원 번호
  rv_no     INTEGER  NOT NULL, -- 리뷰 번호
  conts     TEXT     NOT NULL, -- 내용
  cdt       DATETIME NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  parent_id INTEGER  NOT NULL, -- 부모 번호
  depth     INTEGER  NOT NULL  -- 단계
);

-- 리뷰 댓글
ALTER TABLE review_cmt
  ADD CONSTRAINT PK_review_cmt -- 리뷰 댓글 기본키
    PRIMARY KEY (
      rv_cmt_no -- 리뷰 댓글 번호
    );

ALTER TABLE review_cmt
  MODIFY COLUMN rv_cmt_no INTEGER NOT NULL AUTO_INCREMENT;

-- 회원
CREATE TABLE member (
  member_no INTEGER      NOT NULL, -- 회원 번호
  email     VARCHAR(40)  NOT NULL, -- 이메일
  pwd       VARCHAR(100) NOT NULL, -- 비밀번호
  name      VARCHAR(50)  NOT NULL, -- 이름
  tel       VARCHAR(30)  NOT NULL, -- 전화번호
  n_name    VARCHAR(50)  NOT NULL, -- 닉네임
  type      VARCHAR(30)  NOT NULL, -- 유형
  ban       BOOLEAN      NOT NULL  -- 활성
);

-- 회원
ALTER TABLE member
  ADD CONSTRAINT PK_member -- 회원 기본키
    PRIMARY KEY (
      member_no -- 회원 번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_member
  ON member ( -- 회원
    email ASC,  -- 이메일
    n_name ASC  -- 닉네임
  );

ALTER TABLE member
  MODIFY COLUMN member_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제조사
CREATE TABLE manufacturer (
  manufac_no INTEGER      NOT NULL, -- 제조사번호
  member_no  INTEGER      NULL,     -- 회원 번호
  reg_no     VARCHAR(30)  NOT NULL, -- 사업자 등록번호
  name       VARCHAR(50)  NOT NULL, -- 회사명
  tel        VARCHAR(30)  NOT NULL, -- 전화번호
  homepage   VARCHAR(255) NULL,     -- 홈페이지
  address    VARCHAR(100) NULL      -- 주소
);

-- 제조사
ALTER TABLE manufacturer
  ADD CONSTRAINT PK_manufacturer -- 제조사 기본키
    PRIMARY KEY (
      manufac_no -- 제조사번호
    );

-- 제조사 유니크 인덱스
CREATE UNIQUE INDEX UIX_manufacturer
  ON manufacturer ( -- 제조사
    reg_no ASC -- 사업자 등록번호
  );

ALTER TABLE manufacturer
  MODIFY COLUMN manufac_no INTEGER NOT NULL AUTO_INCREMENT;

-- 자유게시판
CREATE TABLE fboard (
  fb_no     INTEGER     NOT NULL, -- 게시물 번호
  member_no INTEGER     NOT NULL, -- 회원 번호
  titl      VARCHAR(50) NOT NULL, -- 제목
  conts     TEXT        NOT NULL, -- 내용
  cdt       DATETIME    NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  cnt       INTEGER     NULL     DEFAULT 0 -- 조회수
);

-- 자유게시판
ALTER TABLE fboard
  ADD CONSTRAINT PK_fboard -- 자유게시판 기본키
    PRIMARY KEY (
      fb_no -- 게시물 번호
    );

ALTER TABLE fboard
  MODIFY COLUMN fb_no INTEGER NOT NULL AUTO_INCREMENT;

-- 자유게시판 댓글
CREATE TABLE fboard_cmt (
  fb_cmt_no INTEGER  NOT NULL, -- 자유게시판 댓글 번호
  member_no INTEGER  NOT NULL, -- 회원 번호
  fb_no     INTEGER  NOT NULL, -- 게시물 번호
  conts     TEXT     NOT NULL, -- 내용
  cdt       DATETIME NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  parent_id INTEGER  NOT NULL, -- 부모 번호
  depth     INTEGER  NOT NULL  -- 단계
);

-- 자유게시판 댓글
ALTER TABLE fboard_cmt
  ADD CONSTRAINT PK_fboard_cmt -- 자유게시판 댓글 기본키
    PRIMARY KEY (
      fb_cmt_no -- 자유게시판 댓글 번호
    );

ALTER TABLE fboard_cmt
  MODIFY COLUMN fb_cmt_no INTEGER NOT NULL AUTO_INCREMENT;

-- 고객문의
CREATE TABLE question (
  q_no      INTEGER      NOT NULL, -- 질문 번호
  qtype_no  INTEGER      NOT NULL, -- 질문 유형 번호
  member_no INTEGER      NOT NULL, -- 회원 번호
  conts     TEXT         NOT NULL, -- 질문 내용
  cdt       DATETIME     NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  titl      VARCHAR(100) NOT NULL, -- 제목
  status    VARCHAR(50)  NOT NULL DEFAULT "답변 대기중" -- 상태
);

-- 고객문의
ALTER TABLE question
  ADD CONSTRAINT PK_question -- 고객문의 기본키
    PRIMARY KEY (
      q_no -- 질문 번호
    );

ALTER TABLE question
  MODIFY COLUMN q_no INTEGER NOT NULL AUTO_INCREMENT;

-- 고객문의유형
CREATE TABLE question_type (
  qtype_no INTEGER     NOT NULL, -- 질문 유형 번호
  conts    VARCHAR(30) NOT NULL  -- 유형명
);

-- 고객문의유형
ALTER TABLE question_type
  ADD CONSTRAINT PK_question_type -- 고객문의유형 기본키
    PRIMARY KEY (
      qtype_no -- 질문 유형 번호
    );

-- 고객문의유형 유니크 인덱스
CREATE UNIQUE INDEX UIX_question_type
  ON question_type ( -- 고객문의유형
    conts ASC -- 유형명
  );

ALTER TABLE question_type
  MODIFY COLUMN qtype_no INTEGER NOT NULL AUTO_INCREMENT;

-- 고객문의답변
CREATE TABLE answer (
  ans_no INTEGER  NOT NULL, -- 답변 번호
  q_no   INTEGER  NOT NULL, -- 질문 번호
  conts  TEXT     NOT NULL, -- 답변 내용
  cdt    DATETIME NULL     DEFAULT CURRENT_TIMESTAMP -- 작성일
);

-- 고객문의답변
ALTER TABLE answer
  ADD CONSTRAINT PK_answer -- 고객문의답변 기본키
    PRIMARY KEY (
      ans_no -- 답변 번호
    );

ALTER TABLE answer
  MODIFY COLUMN ans_no INTEGER NOT NULL AUTO_INCREMENT;

-- 공지사항
CREATE TABLE notice (
  ntc_no INTEGER     NOT NULL, -- 공지사항 번호
  titl   VARCHAR(50) NOT NULL, -- 공지사항 제목
  conts  TEXT        NOT NULL, -- 공지사항 내용
  cdt    DATETIME    NULL     DEFAULT CURRENT_TIMESTAMP, -- 작성일
  cnt    INTEGER     NULL     DEFAULT 0 -- 조회수
);

-- 공지사항
ALTER TABLE notice
  ADD CONSTRAINT PK_notice -- 공지사항 기본키
    PRIMARY KEY (
      ntc_no -- 공지사항 번호
    );

ALTER TABLE notice
  MODIFY COLUMN ntc_no INTEGER NOT NULL AUTO_INCREMENT;

-- 자주묻는질문
CREATE TABLE faq (
  faq_no  INTEGER     NOT NULL, -- 질문 번호
  qctg_no INTEGER     NOT NULL, -- 질문카테고리번호
  conts   TEXT        NOT NULL, -- 내용
  titl    VARCHAR(50) NOT NULL  -- 제목
);

-- 자주묻는질문
ALTER TABLE faq
  ADD CONSTRAINT PK_faq -- 자주묻는질문 기본키
    PRIMARY KEY (
      faq_no -- 질문 번호
    );

ALTER TABLE faq
  MODIFY COLUMN faq_no INTEGER NOT NULL AUTO_INCREMENT;

-- 질문카테고리
CREATE TABLE faq_type (
  qctg_no INTEGER     NOT NULL, -- 질문카테고리번호
  name    VARCHAR(50) NOT NULL  -- 카테고리 이름
);

-- 질문카테고리
ALTER TABLE faq_type
  ADD CONSTRAINT PK_faq_type -- 질문카테고리 기본키
    PRIMARY KEY (
      qctg_no -- 질문카테고리번호
    );

-- 질문카테고리 유니크 인덱스
CREATE UNIQUE INDEX UIX_faq_type
  ON faq_type ( -- 질문카테고리
    name ASC -- 카테고리 이름
  );

ALTER TABLE faq_type
  MODIFY COLUMN qctg_no INTEGER NOT NULL AUTO_INCREMENT;

-- 팁
CREATE TABLE tip (
  tip_no     INTEGER  NOT NULL, -- 팁 번호
  product_no INTEGER  NOT NULL, -- 제품번호
  member_no  INTEGER  NOT NULL, -- 회원 번호
  conts      TEXT     NOT NULL, -- 팁 내용
  cdt        DATETIME NULL     DEFAULT CURRENT_TIMESTAMP -- 작성일
);

-- 팁
ALTER TABLE tip
  ADD CONSTRAINT PK_tip -- 팁 기본키
    PRIMARY KEY (
      tip_no -- 팁 번호
    );

ALTER TABLE tip
  MODIFY COLUMN tip_no INTEGER NOT NULL AUTO_INCREMENT;

-- 팁 히스토리
CREATE TABLE tip_history (
  this_no  INTEGER     NOT NULL, -- 히스토리 번호
  tip_no   INTEGER     NOT NULL, -- 팁 번호
  conts    TEXT        NOT NULL, -- 히스토리 내용
  udt      DATETIME    NULL     DEFAULT CURRENT_TIMESTAMP, -- 백업일
  nickName VARCHAR(30) NOT NULL  -- 닉네임
);

-- 팁 히스토리
ALTER TABLE tip_history
  ADD CONSTRAINT PK_tip_history -- 팁 히스토리 기본키
    PRIMARY KEY (
      this_no -- 히스토리 번호
    );

ALTER TABLE tip_history
  MODIFY COLUMN this_no INTEGER NOT NULL AUTO_INCREMENT;

-- 제품 첨부파일
CREATE TABLE product_file (
  pfile_no   INTEGER      NOT NULL, -- 첨부파일 번호
  product_no INTEGER      NOT NULL, -- 제품번호
  img        VARCHAR(255) NOT NULL  -- 제품 사진
);

-- 제품 첨부파일
ALTER TABLE product_file
  ADD CONSTRAINT PK_product_file -- 제품 첨부파일 기본키
    PRIMARY KEY (
      pfile_no -- 첨부파일 번호
    );

ALTER TABLE product_file
  MODIFY COLUMN pfile_no INTEGER NOT NULL AUTO_INCREMENT;

-- 리뷰 첨부파일
CREATE TABLE review_file (
  rv_file_no INTEGER      NOT NULL, -- 첨부파일 번호
  rv_no      INTEGER      NOT NULL, -- 리뷰 번호
  img        VARCHAR(255) NULL,     -- 리뷰 사진
  video      VARCHAR(255) NULL      -- 리뷰 동영상
);

-- 리뷰 첨부파일
ALTER TABLE review_file
  ADD CONSTRAINT PK_review_file -- 리뷰 첨부파일 기본키
    PRIMARY KEY (
      rv_file_no -- 첨부파일 번호
    );

ALTER TABLE review_file
  MODIFY COLUMN rv_file_no INTEGER NOT NULL AUTO_INCREMENT;

-- 매뉴얼 첨부파일
CREATE TABLE manual_file (
  mfile_no       INTEGER      NOT NULL, -- 첨부파일 번호
  manual_no      INTEGER      NOT NULL, -- 메뉴얼번호
  manual_type_no INTEGER      NOT NULL, -- 유형번호
  conts          TEXT         NULL,     -- 내용
  file           VARCHAR(255) NULL      -- 파일
);

-- 매뉴얼 첨부파일
ALTER TABLE manual_file
  ADD CONSTRAINT PK_manual_file -- 매뉴얼 첨부파일 기본키
    PRIMARY KEY (
      mfile_no -- 첨부파일 번호
    );

ALTER TABLE manual_file
  MODIFY COLUMN mfile_no INTEGER NOT NULL AUTO_INCREMENT;

-- 자게 첨부파일
CREATE TABLE fboard_file (
  fb_file_no INTEGER      NOT NULL, -- 첨부파일 번호
  fb_no      INTEGER      NOT NULL, -- 게시물 번호
  file       VARCHAR(255) NOT NULL  -- 첨부파일
);

-- 자게 첨부파일
ALTER TABLE fboard_file
  ADD CONSTRAINT PK_fboard_file -- 자게 첨부파일 기본키
    PRIMARY KEY (
      fb_file_no -- 첨부파일 번호
    );

ALTER TABLE fboard_file
  MODIFY COLUMN fb_file_no INTEGER NOT NULL AUTO_INCREMENT;

-- 구성품
CREATE TABLE component (
  cmp_no    INTEGER     NOT NULL, -- 구성품번호
  manual_no INTEGER     NOT NULL, -- 메뉴얼번호
  name      VARCHAR(50) NOT NULL  -- 제목
);

-- 구성품
ALTER TABLE component
  ADD CONSTRAINT PK_component -- 구성품 기본키
    PRIMARY KEY (
      cmp_no -- 구성품번호
    );

ALTER TABLE component
  MODIFY COLUMN cmp_no INTEGER NOT NULL AUTO_INCREMENT;

-- 매뉴얼댓글추천
CREATE TABLE manual_rcm (
  member_no INTEGER NOT NULL, -- 회원 번호
  m_cmt_no  INTEGER NOT NULL  -- 매뉴얼 댓글 번호
);

-- 매뉴얼댓글추천
ALTER TABLE manual_rcm
  ADD CONSTRAINT PK_manual_rcm -- 매뉴얼댓글추천 기본키
    PRIMARY KEY (
      member_no, -- 회원 번호
      m_cmt_no   -- 매뉴얼 댓글 번호
    );

-- 리뷰댓글추천
CREATE TABLE review_rcm (
  rv_no     INTEGER NOT NULL, -- 리뷰 번호
  rv_cmt_no INTEGER NOT NULL  -- 리뷰 댓글 번호
);

-- 리뷰댓글추천
ALTER TABLE review_rcm
  ADD CONSTRAINT PK_review_rcm -- 리뷰댓글추천 기본키
    PRIMARY KEY (
      rv_no,     -- 리뷰 번호
      rv_cmt_no  -- 리뷰 댓글 번호
    );

-- 자유게시판댓글 추천
CREATE TABLE fboard_rcm (
  member_no INTEGER NOT NULL, -- 회원 번호
  fb_cmt_no INTEGER NOT NULL  -- 자유게시판 댓글 번호
);

-- 자유게시판댓글 추천
ALTER TABLE fboard_rcm
  ADD CONSTRAINT PK_fboard_rcm -- 자유게시판댓글 추천 기본키
    PRIMARY KEY (
      member_no, -- 회원 번호
      fb_cmt_no  -- 자유게시판 댓글 번호
    );

-- 주의사항
CREATE TABLE precautions (
  pcautions_no INTEGER     NOT NULL, -- 주의사항번호
  manual_no    INTEGER     NOT NULL, -- 메뉴얼번호
  titl         VARCHAR(50) NOT NULL  -- 제목
);

-- 주의사항
ALTER TABLE precautions
  ADD CONSTRAINT PK_precautions -- 주의사항 기본키
    PRIMARY KEY (
      pcautions_no -- 주의사항번호
    );

ALTER TABLE precautions
  MODIFY COLUMN pcautions_no INTEGER NOT NULL AUTO_INCREMENT;

-- 임시 테이블
CREATE TABLE question_file (
  question_file_no INTEGER      NOT NULL, -- 파일번호
  q_no             INTEGER      NOT NULL, -- 질문 번호
  file_path        VARCHAR(255) NOT NULL  -- 첨부파일
);

-- 임시 테이블
ALTER TABLE question_file
  ADD CONSTRAINT PK_question_file -- 임시 테이블 기본키
    PRIMARY KEY (
      question_file_no -- 파일번호
    );

ALTER TABLE question_file
  MODIFY COLUMN question_file_no INTEGER NOT NULL AUTO_INCREMENT;

-- 임시 테이블2
CREATE TABLE answer_file (
  answer_file_no INTEGER      NOT NULL, -- 새 컬럼
  ans_no         INTEGER      NOT NULL, -- 답변 번호
  file_path      VARCHAR(255) NOT NULL  -- 첨부파일
);

-- 임시 테이블2
ALTER TABLE answer_file
  ADD CONSTRAINT PK_answer_file -- 임시 테이블2 기본키
    PRIMARY KEY (
      answer_file_no -- 새 컬럼
    );

ALTER TABLE answer_file
  MODIFY COLUMN answer_file_no INTEGER NOT NULL AUTO_INCREMENT;

-- 구성품2
CREATE TABLE basic (
  cmp_no    INTEGER     NOT NULL, -- 기본메뉴얼번호
  manual_no INTEGER     NOT NULL, -- 메뉴얼번호
  name      VARCHAR(50) NOT NULL  -- 제목
);

-- 구성품2
ALTER TABLE basic
  ADD CONSTRAINT PK_basic -- 구성품2 기본키
    PRIMARY KEY (
      cmp_no -- 기본메뉴얼번호
    );

-- 메뉴얼 페이지 타입
CREATE TABLE manual_type (
  manual_type_no INTEGER     NOT NULL, -- 유형번호
  name           VARCHAR(50) NOT NULL  -- 유형이름
);

-- 메뉴얼 페이지 타입
ALTER TABLE manual_type
  ADD CONSTRAINT PK_manual_type -- 메뉴얼 페이지 타입 기본키
    PRIMARY KEY (
      manual_type_no -- 유형번호
    );

-- 매뉴얼
ALTER TABLE manual
  ADD CONSTRAINT FK_product_TO_manual -- 제품 -> 매뉴얼
    FOREIGN KEY (
      product_no -- 제품번호
    )
    REFERENCES product ( -- 제품
      product_no -- 제품번호
    );

-- 제품
ALTER TABLE product
  ADD CONSTRAINT FK_small_category_TO_product -- 제품 소분류 -> 제품
    FOREIGN KEY (
      sctg_no -- 제품소분류번호
    )
    REFERENCES small_category ( -- 제품 소분류
      sctg_no -- 제품소분류번호
    );

-- 제품
ALTER TABLE product
  ADD CONSTRAINT FK_manufacturer_TO_product -- 제조사 -> 제품
    FOREIGN KEY (
      manufac_no -- 제조사번호
    )
    REFERENCES manufacturer ( -- 제조사
      manufac_no -- 제조사번호
    );

-- 제품 소분류
ALTER TABLE small_category
  ADD CONSTRAINT FK_large_category_TO_small_category -- 제품 대분류 -> 제품 소분류
    FOREIGN KEY (
      lctg_no -- 제품대분류번호
    )
    REFERENCES large_category ( -- 제품 대분류
      lctg_no -- 제품대분류번호
    );

-- 매뉴얼 댓글
ALTER TABLE manual_cmt
  ADD CONSTRAINT FK_member_TO_manual_cmt -- 회원 -> 매뉴얼 댓글
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 매뉴얼 댓글
ALTER TABLE manual_cmt
  ADD CONSTRAINT FK_manual_TO_manual_cmt -- 매뉴얼 -> 매뉴얼 댓글
    FOREIGN KEY (
      manual_no -- 메뉴얼번호
    )
    REFERENCES manual ( -- 매뉴얼
      manual_no -- 메뉴얼번호
    );

-- 리뷰
ALTER TABLE review
  ADD CONSTRAINT FK_product_TO_review -- 제품 -> 리뷰
    FOREIGN KEY (
      product_no -- 제품 번호
    )
    REFERENCES product ( -- 제품
      product_no -- 제품번호
    );

-- 리뷰
ALTER TABLE review
  ADD CONSTRAINT FK_member_TO_review -- 회원 -> 리뷰
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 제품만족도
ALTER TABLE satisfy
  ADD CONSTRAINT FK_product_TO_satisfy -- 제품 -> 제품만족도
    FOREIGN KEY (
      product_no -- 제품번호
    )
    REFERENCES product ( -- 제품
      product_no -- 제품번호
    );

-- 제품만족도
ALTER TABLE satisfy
  ADD CONSTRAINT FK_member_TO_satisfy -- 회원 -> 제품만족도
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 리뷰 댓글
ALTER TABLE review_cmt
  ADD CONSTRAINT FK_review_TO_review_cmt -- 리뷰 -> 리뷰 댓글
    FOREIGN KEY (
      rv_no -- 리뷰 번호
    )
    REFERENCES review ( -- 리뷰
      rv_no -- 리뷰 번호
    );

-- 리뷰 댓글
ALTER TABLE review_cmt
  ADD CONSTRAINT FK_member_TO_review_cmt -- 회원 -> 리뷰 댓글
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 제조사
ALTER TABLE manufacturer
  ADD CONSTRAINT FK_member_TO_manufacturer -- 회원 -> 제조사
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 자유게시판
ALTER TABLE fboard
  ADD CONSTRAINT FK_member_TO_fboard -- 회원 -> 자유게시판
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 자유게시판 댓글
ALTER TABLE fboard_cmt
  ADD CONSTRAINT FK_member_TO_fboard_cmt -- 회원 -> 자유게시판 댓글
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 자유게시판 댓글
ALTER TABLE fboard_cmt
  ADD CONSTRAINT FK_fboard_TO_fboard_cmt -- 자유게시판 -> 자유게시판 댓글
    FOREIGN KEY (
      fb_no -- 게시물 번호
    )
    REFERENCES fboard ( -- 자유게시판
      fb_no -- 게시물 번호
    );

-- 고객문의
ALTER TABLE question
  ADD CONSTRAINT FK_question_type_TO_question -- 고객문의유형 -> 고객문의
    FOREIGN KEY (
      qtype_no -- 질문 유형 번호
    )
    REFERENCES question_type ( -- 고객문의유형
      qtype_no -- 질문 유형 번호
    );

-- 고객문의
ALTER TABLE question
  ADD CONSTRAINT FK_member_TO_question -- 회원 -> 고객문의
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 고객문의답변
ALTER TABLE answer
  ADD CONSTRAINT FK_question_TO_answer -- 고객문의 -> 고객문의답변
    FOREIGN KEY (
      q_no -- 질문 번호
    )
    REFERENCES question ( -- 고객문의
      q_no -- 질문 번호
    );

-- 자주묻는질문
ALTER TABLE faq
  ADD CONSTRAINT FK_faq_type_TO_faq -- 질문카테고리 -> 자주묻는질문
    FOREIGN KEY (
      qctg_no -- 질문카테고리번호
    )
    REFERENCES faq_type ( -- 질문카테고리
      qctg_no -- 질문카테고리번호
    );

-- 팁
ALTER TABLE tip
  ADD CONSTRAINT FK_member_TO_tip -- 회원 -> 팁
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 팁
ALTER TABLE tip
  ADD CONSTRAINT FK_product_TO_tip -- 제품 -> 팁
    FOREIGN KEY (
      product_no -- 제품번호
    )
    REFERENCES product ( -- 제품
      product_no -- 제품번호
    );

-- 팁 히스토리
ALTER TABLE tip_history
  ADD CONSTRAINT FK_tip_TO_tip_history -- 팁 -> 팁 히스토리
    FOREIGN KEY (
      tip_no -- 팁 번호
    )
    REFERENCES tip ( -- 팁
      tip_no -- 팁 번호
    );

-- 제품 첨부파일
ALTER TABLE product_file
  ADD CONSTRAINT FK_product_TO_product_file -- 제품 -> 제품 첨부파일
    FOREIGN KEY (
      product_no -- 제품번호
    )
    REFERENCES product ( -- 제품
      product_no -- 제품번호
    );

-- 리뷰 첨부파일
ALTER TABLE review_file
  ADD CONSTRAINT FK_review_TO_review_file -- 리뷰 -> 리뷰 첨부파일
    FOREIGN KEY (
      rv_no -- 리뷰 번호
    )
    REFERENCES review ( -- 리뷰
      rv_no -- 리뷰 번호
    );

-- 매뉴얼 첨부파일
ALTER TABLE manual_file
  ADD CONSTRAINT FK_manual_TO_manual_file -- 매뉴얼 -> 매뉴얼 첨부파일
    FOREIGN KEY (
      manual_no -- 메뉴얼번호
    )
    REFERENCES manual ( -- 매뉴얼
      manual_no -- 메뉴얼번호
    );

-- 매뉴얼 첨부파일
ALTER TABLE manual_file
  ADD CONSTRAINT FK_manual_type_TO_manual_file -- 메뉴얼 페이지 타입 -> 매뉴얼 첨부파일
    FOREIGN KEY (
      manual_type_no -- 유형번호
    )
    REFERENCES manual_type ( -- 메뉴얼 페이지 타입
      manual_type_no -- 유형번호
    );

-- 자게 첨부파일
ALTER TABLE fboard_file
  ADD CONSTRAINT FK_fboard_TO_fboard_file -- 자유게시판 -> 자게 첨부파일
    FOREIGN KEY (
      fb_no -- 게시물 번호
    )
    REFERENCES fboard ( -- 자유게시판
      fb_no -- 게시물 번호
    );

-- 구성품
ALTER TABLE component
  ADD CONSTRAINT FK_manual_TO_component -- 매뉴얼 -> 구성품
    FOREIGN KEY (
      manual_no -- 메뉴얼번호
    )
    REFERENCES manual ( -- 매뉴얼
      manual_no -- 메뉴얼번호
    );

-- 매뉴얼댓글추천
ALTER TABLE manual_rcm
  ADD CONSTRAINT FK_member_TO_manual_rcm -- 회원 -> 매뉴얼댓글추천
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 매뉴얼댓글추천
ALTER TABLE manual_rcm
  ADD CONSTRAINT FK_manual_cmt_TO_manual_rcm -- 매뉴얼 댓글 -> 매뉴얼댓글추천
    FOREIGN KEY (
      m_cmt_no -- 매뉴얼 댓글 번호
    )
    REFERENCES manual_cmt ( -- 매뉴얼 댓글
      m_cmt_no -- 매뉴얼 댓글 번호
    );

-- 리뷰댓글추천
ALTER TABLE review_rcm
  ADD CONSTRAINT FK_review_TO_review_rcm -- 리뷰 -> 리뷰댓글추천
    FOREIGN KEY (
      rv_no -- 리뷰 번호
    )
    REFERENCES review ( -- 리뷰
      rv_no -- 리뷰 번호
    );

-- 리뷰댓글추천
ALTER TABLE review_rcm
  ADD CONSTRAINT FK_review_cmt_TO_review_rcm -- 리뷰 댓글 -> 리뷰댓글추천
    FOREIGN KEY (
      rv_cmt_no -- 리뷰 댓글 번호
    )
    REFERENCES review_cmt ( -- 리뷰 댓글
      rv_cmt_no -- 리뷰 댓글 번호
    );

-- 자유게시판댓글 추천
ALTER TABLE fboard_rcm
  ADD CONSTRAINT FK_member_TO_fboard_rcm -- 회원 -> 자유게시판댓글 추천
    FOREIGN KEY (
      member_no -- 회원 번호
    )
    REFERENCES member ( -- 회원
      member_no -- 회원 번호
    );

-- 자유게시판댓글 추천
ALTER TABLE fboard_rcm
  ADD CONSTRAINT FK_fboard_cmt_TO_fboard_rcm -- 자유게시판 댓글 -> 자유게시판댓글 추천
    FOREIGN KEY (
      fb_cmt_no -- 자유게시판 댓글 번호
    )
    REFERENCES fboard_cmt ( -- 자유게시판 댓글
      fb_cmt_no -- 자유게시판 댓글 번호
    );

-- 주의사항
ALTER TABLE precautions
  ADD CONSTRAINT FK_manual_TO_precautions -- 매뉴얼 -> 주의사항
    FOREIGN KEY (
      manual_no -- 메뉴얼번호
    )
    REFERENCES manual ( -- 매뉴얼
      manual_no -- 메뉴얼번호
    );

-- 임시 테이블
ALTER TABLE question_file
  ADD CONSTRAINT FK_question_TO_question_file -- 고객문의 -> 임시 테이블
    FOREIGN KEY (
      q_no -- 질문 번호
    )
    REFERENCES question ( -- 고객문의
      q_no -- 질문 번호
    );

-- 임시 테이블2
ALTER TABLE answer_file
  ADD CONSTRAINT FK_answer_TO_answer_file -- 고객문의답변 -> 임시 테이블2
    FOREIGN KEY (
      ans_no -- 답변 번호
    )
    REFERENCES answer ( -- 고객문의답변
      ans_no -- 답변 번호
    );

-- 구성품2
ALTER TABLE basic
  ADD CONSTRAINT FK_manual_TO_basic -- 매뉴얼 -> 구성품2
    FOREIGN KEY (
      manual_no -- 메뉴얼번호
    )
    REFERENCES manual ( -- 매뉴얼
      manual_no -- 메뉴얼번호
    );