-- 매뉴얼
DROP TABLE IF EXISTS manual RESTRICT;

-- 제품
DROP TABLE IF EXISTS product RESTRICT;

-- 제품 대분류
DROP TABLE IF EXISTS large_category RESTRICT;

-- 제품 소분류
DROP TABLE IF EXISTS small_category RESTRICT;

-- 제품필수명세항목
DROP TABLE IF EXISTS essential_spec RESTRICT;

-- 추가 정보
DROP TABLE IF EXISTS add_spec RESTRICT;

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

-- 관리자
DROP TABLE IF EXISTS manager RESTRICT;

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
DROP TABLE IF EXISTS quetion_category RESTRICT;

-- 팁
DROP TABLE IF EXISTS tip RESTRICT;

-- 팁 히스토리
DROP TABLE IF EXISTS tip_history RESTRICT;

-- 중고 게시판
DROP TABLE IF EXISTS used_board RESTRICT;

-- 제품상태
DROP TABLE IF EXISTS prod_status RESTRICT;

-- 중고 댓글
DROP TABLE IF EXISTS uboard_cmt RESTRICT;

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

-- 매뉴얼분류
DROP TABLE IF EXISTS TABLE2 RESTRICT;

-- 매뉴얼댓글추천
DROP TABLE IF EXISTS manual_rcm RESTRICT;

-- 제품필수명세항목값
DROP TABLE IF EXISTS TABLE4 RESTRICT;

-- 제품명세기타항목
DROP TABLE IF EXISTS TABLE5 RESTRICT;

-- 리뷰댓글추천
DROP TABLE IF EXISTS review_rcm RESTRICT;

-- 자유게시판댓글 추천
DROP TABLE IF EXISTS fboard_rcm RESTRICT;

-- 주의사항
DROP TABLE IF EXISTS precautions RESTRICT;

-- 새 테이블
DROP TABLE IF EXISTS TABLE7 RESTRICT;

-- 매뉴얼
CREATE TABLE manual (
	manual_no  INTEGER      NOT NULL COMMENT '메뉴얼번호', -- 메뉴얼번호
	product_no INTEGER      NOT NULL COMMENT '제품번호', -- 제품번호
	conts      TEXT         NOT NULL COMMENT '매뉴얼 설명', -- 매뉴얼 설명
	cnt        INTEGER      NULL     DEFAULT 0 COMMENT '조회수', -- 조회수
	vlink      VARCHAR(255) NULL     COMMENT '동영상 링크' -- 동영상 링크
)
COMMENT '매뉴얼';

-- 매뉴얼
ALTER TABLE manual
	ADD CONSTRAINT PK_manual -- 매뉴얼 기본키
		PRIMARY KEY (
			manual_no -- 메뉴얼번호
		);

ALTER TABLE manual
	MODIFY COLUMN manual_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '메뉴얼번호';

-- 제품
CREATE TABLE product (
	product_no INTEGER     NOT NULL COMMENT '제품번호', -- 제품번호
	sctg_no    INTEGER     NOT NULL COMMENT '제품소분류번호', -- 제품소분류번호
	manufac_no INTEGER     NULL     COMMENT '제조사번호', -- 제조사번호
	name       VARCHAR(50) NOT NULL COMMENT '제품명' -- 제품명
)
COMMENT '제품';

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
	MODIFY COLUMN product_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '제품번호';

-- 제품 대분류
CREATE TABLE large_category (
	lctg_no INTEGER     NOT NULL COMMENT '제품대분류번호', -- 제품대분류번호
	name    VARCHAR(50) NOT NULL COMMENT '상위 카테고리 이름' -- 상위 카테고리 이름
)
COMMENT '제품 대분류';

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
	MODIFY COLUMN lctg_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '제품대분류번호';

-- 제품 소분류
CREATE TABLE small_category (
	sctg_no INTEGER     NOT NULL COMMENT '제품소분류번호', -- 제품소분류번호
	lctg_no INTEGER     NOT NULL COMMENT '제품대분류번호', -- 제품대분류번호
	name    VARCHAR(50) NOT NULL COMMENT '하위 카테고리 이름' -- 하위 카테고리 이름
)
COMMENT '제품 소분류';

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
	MODIFY COLUMN sctg_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '제품소분류번호';

-- 제품필수명세항목
CREATE TABLE essential_spec (
	espec_no INTEGER NOT NULL COMMENT '제품명세항목번호', -- 제품명세항목번호
	sctg_no  INTEGER NOT NULL COMMENT '제품소분류번호', -- 제품소분류번호
	esinfo   TEXT    NOT NULL COMMENT '제품명세항목명' -- 제품명세항목명
)
COMMENT '제품필수명세항목';

-- 제품필수명세항목
ALTER TABLE essential_spec
	ADD CONSTRAINT PK_essential_spec -- 제품필수명세항목 기본키
		PRIMARY KEY (
			espec_no -- 제품명세항목번호
		);

-- 추가 정보
CREATE TABLE add_spec (
	aspec_no INTEGER NOT NULL COMMENT '추가 정보 번호', -- 추가 정보 번호
	espec_no INTEGER NOT NULL COMMENT '제품명세항목번호', -- 제품명세항목번호
	asinfo   TEXT    NOT NULL COMMENT '추가정보' -- 추가정보
)
COMMENT '추가 정보';

-- 추가 정보
ALTER TABLE add_spec
	ADD CONSTRAINT PK_add_spec -- 추가 정보 기본키
		PRIMARY KEY (
			aspec_no -- 추가 정보 번호
		);

-- 매뉴얼 댓글
CREATE TABLE manual_cmt (
	m_cmt_no  INTEGER NOT NULL COMMENT '매뉴얼 댓글 번호', -- 매뉴얼 댓글 번호
	manual_no INTEGER NOT NULL COMMENT '메뉴얼번호', -- 메뉴얼번호
	member_no INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	conts     TEXT    NOT NULL COMMENT '내용', -- 내용
	cdt       DATE    NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일' -- 작성일
)
COMMENT '매뉴얼 댓글';

-- 매뉴얼 댓글
ALTER TABLE manual_cmt
	ADD CONSTRAINT PK_manual_cmt -- 매뉴얼 댓글 기본키
		PRIMARY KEY (
			m_cmt_no -- 매뉴얼 댓글 번호
		);

ALTER TABLE manual_cmt
	MODIFY COLUMN m_cmt_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '매뉴얼 댓글 번호';

-- 리뷰
CREATE TABLE review (
	rv_no      INTEGER     NOT NULL COMMENT '리뷰 번호', -- 리뷰 번호
	product_no INTEGER     NOT NULL COMMENT '제품 번호', -- 제품 번호
	member_no  INTEGER     NOT NULL COMMENT '회원 번호', -- 회원 번호
	name       VARCHAR(50) NOT NULL COMMENT '리뷰명', -- 리뷰명
	conts      TEXT        NOT NULL COMMENT '리뷰 내용', -- 리뷰 내용
	cdt        DATE        NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일', -- 작성일
	cnt        INTEGER     NULL     DEFAULT 0 COMMENT '리뷰 조회수' -- 리뷰 조회수
)
COMMENT '리뷰';

-- 리뷰
ALTER TABLE review
	ADD CONSTRAINT PK_review -- 리뷰 기본키
		PRIMARY KEY (
			rv_no -- 리뷰 번호
		);

ALTER TABLE review
	MODIFY COLUMN rv_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '리뷰 번호';

-- 제품만족도
CREATE TABLE satisfy (
	stf_no     INTEGER NOT NULL COMMENT '만족도 정보 번호', -- 만족도 정보 번호
	product_no INTEGER NOT NULL COMMENT '제품번호', -- 제품번호
	member_no  INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	level      DOUBLE  NOT NULL COMMENT '사용 난이도', -- 사용 난이도
	understand DOUBLE  NOT NULL COMMENT '사용설명서 이해도', -- 사용설명서 이해도
	dgn        DOUBLE  NOT NULL COMMENT '제품 디자인', -- 제품 디자인
	as_stf     DOUBLE  NOT NULL COMMENT 'A/S 만족도', -- A/S 만족도
	useful     DOUBLE  NOT NULL COMMENT '편의성', -- 편의성
	price_stf  DOUBLE  NOT NULL COMMENT '가격 만족도' -- 가격 만족도
)
COMMENT '제품만족도';

-- 제품만족도
ALTER TABLE satisfy
	ADD CONSTRAINT PK_satisfy -- 제품만족도 기본키
		PRIMARY KEY (
			stf_no -- 만족도 정보 번호
		);

ALTER TABLE satisfy
	MODIFY COLUMN stf_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '만족도 정보 번호';

-- 리뷰 댓글
CREATE TABLE review_cmt (
	rv_cmt_no INTEGER NOT NULL COMMENT '리뷰 댓글 번호', -- 리뷰 댓글 번호
	member_no INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	rv_no     INTEGER NOT NULL COMMENT '리뷰 번호', -- 리뷰 번호
	conts     TEXT    NOT NULL COMMENT '내용', -- 내용
	cdt       DATE    NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일' -- 작성일
)
COMMENT '리뷰 댓글';

-- 리뷰 댓글
ALTER TABLE review_cmt
	ADD CONSTRAINT PK_review_cmt -- 리뷰 댓글 기본키
		PRIMARY KEY (
			rv_cmt_no -- 리뷰 댓글 번호
		);

ALTER TABLE review_cmt
	MODIFY COLUMN rv_cmt_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '리뷰 댓글 번호';

-- 회원
CREATE TABLE member (
	member_no INTEGER      NOT NULL COMMENT '회원 번호', -- 회원 번호
	email     VARCHAR(40)  NOT NULL COMMENT '이메일', -- 이메일
	pwd       VARCHAR(100) NOT NULL COMMENT '비밀번호', -- 비밀번호
	name      VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
	tel       VARCHAR(30)  NOT NULL COMMENT '전화번호', -- 전화번호
	n_name    VARCHAR(50)  NOT NULL COMMENT '닉네임', -- 닉네임
	type      INTEGER      NOT NULL COMMENT '유형', -- 유형
	ban       BOOLEAN      NOT NULL COMMENT '활성' -- 활성
)
COMMENT '회원';

-- 회원
ALTER TABLE member
	ADD CONSTRAINT PK_member -- 회원 기본키
		PRIMARY KEY (
			member_no -- 회원 번호
		);

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX UIX_member
	ON member ( -- 회원
		email ASC -- 이메일
	);

ALTER TABLE member
	MODIFY COLUMN member_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원 번호';

-- 관리자
CREATE TABLE manager (
	mng_no    INTEGER NOT NULL COMMENT '관리자 번호', -- 관리자 번호
	member_no INTEGER NOT NULL COMMENT '회원 번호' -- 회원 번호
)
COMMENT '관리자';

-- 관리자
ALTER TABLE manager
	ADD CONSTRAINT PK_manager -- 관리자 기본키
		PRIMARY KEY (
			mng_no -- 관리자 번호
		);

-- 제조사
CREATE TABLE manufacturer (
	manufac_no INTEGER      NOT NULL COMMENT '제조사번호', -- 제조사번호
	reg_no     INTEGER      NOT NULL COMMENT '사업자 등록번호', -- 사업자 등록번호
	name       VARCHAR(50)  NOT NULL COMMENT '회사명', -- 회사명
	tel        VARCHAR(30)  NOT NULL COMMENT '전화번호', -- 전화번호
	homepage   VARCHAR(255) NULL     COMMENT '홈페이지' -- 홈페이지
)
COMMENT '제조사';

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
	MODIFY COLUMN manufac_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '제조사번호';

-- 자유게시판
CREATE TABLE fboard (
	fb_no     INTEGER     NOT NULL COMMENT '게시물 번호', -- 게시물 번호
	member_no INTEGER     NOT NULL COMMENT '회원 번호', -- 회원 번호
	titl      VARCHAR(50) NOT NULL COMMENT '제목', -- 제목
	conts     TEXT        NOT NULL COMMENT '내용', -- 내용
	cdt       DATE        NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일', -- 작성일
	cnt       INTEGER     NULL     DEFAULT 0 COMMENT '조회수' -- 조회수
)
COMMENT '자유게시판';

-- 자유게시판
ALTER TABLE fboard
	ADD CONSTRAINT PK_fboard -- 자유게시판 기본키
		PRIMARY KEY (
			fb_no -- 게시물 번호
		);

ALTER TABLE fboard
	MODIFY COLUMN fb_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시물 번호';

-- 자유게시판 댓글
CREATE TABLE fboard_cmt (
	fb_cmt_no INTEGER NOT NULL COMMENT '자유게시판 댓글 번호', -- 자유게시판 댓글 번호
	member_no INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	fb_no     INTEGER NOT NULL COMMENT '게시물 번호', -- 게시물 번호
	conts     TEXT    NOT NULL COMMENT '내용', -- 내용
	cdt       DATE    NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일' -- 작성일
)
COMMENT '자유게시판 댓글';

-- 자유게시판 댓글
ALTER TABLE fboard_cmt
	ADD CONSTRAINT PK_fboard_cmt -- 자유게시판 댓글 기본키
		PRIMARY KEY (
			fb_cmt_no -- 자유게시판 댓글 번호
		);

ALTER TABLE fboard_cmt
	MODIFY COLUMN fb_cmt_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '자유게시판 댓글 번호';

-- 고객문의
CREATE TABLE question (
	q_no      INTEGER      NOT NULL COMMENT '질문 번호', -- 질문 번호
	qtype_no  INTEGER      NOT NULL COMMENT '질문 유형 번호', -- 질문 유형 번호
	member_no INTEGER      NOT NULL COMMENT '회원 번호', -- 회원 번호
	conts     TEXT         NOT NULL COMMENT '질문 내용', -- 질문 내용
	cdt       DATE         NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일', -- 작성일
	file      VARCHAR(255) NULL     COMMENT '첨부파일' -- 첨부파일
)
COMMENT '고객문의';

-- 고객문의
ALTER TABLE question
	ADD CONSTRAINT PK_question -- 고객문의 기본키
		PRIMARY KEY (
			q_no -- 질문 번호
		);

ALTER TABLE question
	MODIFY COLUMN q_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '질문 번호';

-- 고객문의유형
CREATE TABLE question_type (
	qtype_no INTEGER NOT NULL COMMENT '질문 유형 번호', -- 질문 유형 번호
	conts    TEXT    NOT NULL COMMENT '유형명' -- 유형명
)
COMMENT '고객문의유형';

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
	MODIFY COLUMN qtype_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '질문 유형 번호';

-- 고객문의답변
CREATE TABLE answer (
	ans_no INTEGER      NOT NULL COMMENT '답변 번호', -- 답변 번호
	q_no   INTEGER      NOT NULL COMMENT '질문 번호', -- 질문 번호
	conts  TEXT         NOT NULL COMMENT '답변 내용', -- 답변 내용
	cdt    DATE         NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일', -- 작성일
	file   VARCHAR(255) NULL     COMMENT '첨부파일' -- 첨부파일
)
COMMENT '고객문의답변';

-- 고객문의답변
ALTER TABLE answer
	ADD CONSTRAINT PK_answer -- 고객문의답변 기본키
		PRIMARY KEY (
			ans_no -- 답변 번호
		);

ALTER TABLE answer
	MODIFY COLUMN ans_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '답변 번호';

-- 공지사항
CREATE TABLE notice (
	ntc_no INTEGER     NOT NULL COMMENT '공지사항 번호', -- 공지사항 번호
	titl   VARCHAR(50) NOT NULL COMMENT '공지사항 제목', -- 공지사항 제목
	conts  TEXT        NOT NULL COMMENT '공지사항 내용', -- 공지사항 내용
	cdt    VARCHAR(50) NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일', -- 작성일
	cnt    INTEGER     NULL     DEFAULT 0 COMMENT '조회수' -- 조회수
)
COMMENT '공지사항';

-- 공지사항
ALTER TABLE notice
	ADD CONSTRAINT PK_notice -- 공지사항 기본키
		PRIMARY KEY (
			ntc_no -- 공지사항 번호
		);

-- 자주묻는질문
CREATE TABLE faq (
	faq_no  INTEGER     NOT NULL COMMENT '질문 번호', -- 질문 번호
	qctg_no INTEGER     NOT NULL COMMENT '질문카테고리번호', -- 질문카테고리번호
	conts   TEXT        NOT NULL COMMENT '내용', -- 내용
	titl    VARCHAR(50) NOT NULL COMMENT '제목' -- 제목
)
COMMENT '자주묻는질문';

-- 자주묻는질문
ALTER TABLE faq
	ADD CONSTRAINT PK_faq -- 자주묻는질문 기본키
		PRIMARY KEY (
			faq_no -- 질문 번호
		);

ALTER TABLE faq
	MODIFY COLUMN faq_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '질문 번호';

-- 질문카테고리
CREATE TABLE quetion_category (
	qctg_no INTEGER     NOT NULL COMMENT '질문카테고리번호', -- 질문카테고리번호
	name    VARCHAR(50) NOT NULL COMMENT '카테고리 이름' -- 카테고리 이름
)
COMMENT '질문카테고리';

-- 질문카테고리
ALTER TABLE quetion_category
	ADD CONSTRAINT PK_quetion_category -- 질문카테고리 기본키
		PRIMARY KEY (
			qctg_no -- 질문카테고리번호
		);

-- 질문카테고리 유니크 인덱스
CREATE UNIQUE INDEX UIX_quetion_category
	ON quetion_category ( -- 질문카테고리
		name ASC -- 카테고리 이름
	);

ALTER TABLE quetion_category
	MODIFY COLUMN qctg_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '질문카테고리번호';

-- 팁
CREATE TABLE tip (
	tip_no     INTEGER NOT NULL COMMENT '팁 번호', -- 팁 번호
	product_no INTEGER NOT NULL COMMENT '제품번호', -- 제품번호
	member_no  INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	conts      TEXT    NOT NULL COMMENT '팁 내용', -- 팁 내용
	cdt        DATE    NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '작성일' -- 작성일
)
COMMENT '팁';

-- 팁
ALTER TABLE tip
	ADD CONSTRAINT PK_tip -- 팁 기본키
		PRIMARY KEY (
			tip_no -- 팁 번호
		);

ALTER TABLE tip
	MODIFY COLUMN tip_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '팁 번호';

-- 팁 히스토리
CREATE TABLE tip_history (
	this_no INTEGER NOT NULL COMMENT '히스토리 번호', -- 히스토리 번호
	tip_no  INTEGER NOT NULL COMMENT '팁 번호', -- 팁 번호
	conts   TEXT    NOT NULL COMMENT '히스토리 내용', -- 히스토리 내용
	udt     DATE    NULL     DEFAULT CURRENT_TIMESTAMP COMMENT '백업일' -- 백업일
)
COMMENT '팁 히스토리';

-- 팁 히스토리
ALTER TABLE tip_history
	ADD CONSTRAINT PK_tip_history -- 팁 히스토리 기본키
		PRIMARY KEY (
			this_no -- 히스토리 번호
		);

ALTER TABLE tip_history
	MODIFY COLUMN this_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '히스토리 번호';

-- 중고 게시판
CREATE TABLE used_board (
	ubno      INTEGER      NOT NULL COMMENT '게시물 번호', -- 게시물 번호
	pstat_no  INTEGER      NOT NULL COMMENT '제품상태번호', -- 제품상태번호
	member_no INTEGER      NOT NULL COMMENT '회원 번호', -- 회원 번호
	titl      VARCHAR(50)  NOT NULL COMMENT '제목', -- 제목
	conts     TEXT         NOT NULL COMMENT '내용', -- 내용
	cdt       DATE         NOT NULL COMMENT '작성일', -- 작성일
	file      VARCHAR(255) NULL     COMMENT '첨부파일' -- 첨부파일
)
COMMENT '중고 게시판';

-- 중고 게시판
ALTER TABLE used_board
	ADD CONSTRAINT PK_used_board -- 중고 게시판 기본키
		PRIMARY KEY (
			ubno -- 게시물 번호
		);

-- 제품상태
CREATE TABLE prod_status (
	pstat_no INTEGER NOT NULL COMMENT '제품상태번호', -- 제품상태번호
	open     BOOLEAN NOT NULL COMMENT '개봉여부', -- 개봉여부
	oper     INTEGER NOT NULL COMMENT '작동상태', -- 작동상태
	gis      INTEGER NOT NULL COMMENT '생활기스', -- 생활기스
	broken   BOOLEAN NOT NULL COMMENT '파손여부', -- 파손여부
	trade    INTEGER NOT NULL COMMENT '거래방법' -- 거래방법
)
COMMENT '제품상태';

-- 제품상태
ALTER TABLE prod_status
	ADD CONSTRAINT PK_prod_status -- 제품상태 기본키
		PRIMARY KEY (
			pstat_no -- 제품상태번호
		);

-- 중고 댓글
CREATE TABLE uboard_cmt (
	ubcmt_no INTEGER NOT NULL COMMENT '중고 댓글 번호', -- 중고 댓글 번호
	ubno     INTEGER NOT NULL COMMENT '게시물 번호', -- 게시물 번호
	conts    TEXT    NOT NULL COMMENT '중고 댓글 내용', -- 중고 댓글 내용
	cdt      DATE    NOT NULL COMMENT '작성일' -- 작성일
)
COMMENT '중고 댓글';

-- 중고 댓글
ALTER TABLE uboard_cmt
	ADD CONSTRAINT PK_uboard_cmt -- 중고 댓글 기본키
		PRIMARY KEY (
			ubcmt_no -- 중고 댓글 번호
		);

-- 제품 첨부파일
CREATE TABLE product_file (
	pfile_no   INTEGER      NOT NULL COMMENT '첨부파일 번호', -- 첨부파일 번호
	product_no INTEGER      NOT NULL COMMENT '제품번호', -- 제품번호
	img        VARCHAR(255) NOT NULL COMMENT '제품 사진' -- 제품 사진
)
COMMENT '제품 첨부파일';

-- 제품 첨부파일
ALTER TABLE product_file
	ADD CONSTRAINT PK_product_file -- 제품 첨부파일 기본키
		PRIMARY KEY (
			pfile_no -- 첨부파일 번호
		);

ALTER TABLE product_file
	MODIFY COLUMN pfile_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호';

-- 리뷰 첨부파일
CREATE TABLE review_file (
	rv_file_no INTEGER      NOT NULL COMMENT '첨부파일 번호', -- 첨부파일 번호
	rv_no      INTEGER      NOT NULL COMMENT '리뷰 번호', -- 리뷰 번호
	img        VARCHAR(255) NULL     COMMENT '리뷰 사진', -- 리뷰 사진
	video      VARCHAR(255) NULL     COMMENT '리뷰 동영상' -- 리뷰 동영상
)
COMMENT '리뷰 첨부파일';

-- 리뷰 첨부파일
ALTER TABLE review_file
	ADD CONSTRAINT PK_review_file -- 리뷰 첨부파일 기본키
		PRIMARY KEY (
			rv_file_no -- 첨부파일 번호
		);

ALTER TABLE review_file
	MODIFY COLUMN rv_file_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호';

-- 매뉴얼 첨부파일
CREATE TABLE manual_file (
	mfile_no  INTEGER      NOT NULL COMMENT '첨부파일 번호', -- 첨부파일 번호
	manual_no INTEGER      NOT NULL COMMENT '메뉴얼번호', -- 메뉴얼번호
	img       VARCHAR(255) NOT NULL COMMENT '사진', -- 사진
	type      INTEGER      NOT NULL COMMENT '유형' -- 유형
)
COMMENT '매뉴얼 첨부파일';

-- 매뉴얼 첨부파일
ALTER TABLE manual_file
	ADD CONSTRAINT PK_manual_file -- 매뉴얼 첨부파일 기본키
		PRIMARY KEY (
			mfile_no -- 첨부파일 번호
		);

ALTER TABLE manual_file
	MODIFY COLUMN mfile_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호';

-- 자게 첨부파일
CREATE TABLE fboard_file (
	fb_file_no INTEGER      NOT NULL COMMENT '첨부파일 번호', -- 첨부파일 번호
	fb_no      INTEGER      NOT NULL COMMENT '게시물 번호', -- 게시물 번호
	file       VARCHAR(255) NOT NULL COMMENT '첨부파일' -- 첨부파일
)
COMMENT '자게 첨부파일';

-- 자게 첨부파일
ALTER TABLE fboard_file
	ADD CONSTRAINT PK_fboard_file -- 자게 첨부파일 기본키
		PRIMARY KEY (
			fb_file_no -- 첨부파일 번호
		);

ALTER TABLE fboard_file
	MODIFY COLUMN fb_file_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호';

-- 구성품
CREATE TABLE component (
	cmp_no      INTEGER      NOT NULL COMMENT '구성품번호', -- 구성품번호
	manual_no   INTEGER      NOT NULL COMMENT '메뉴얼번호', -- 메뉴얼번호
	name        VARCHAR(50)  NOT NULL COMMENT '제목', -- 제목
	explanation TEXT         NOT NULL COMMENT '설명', -- 설명
	img         VARCHAR(255) NULL     COMMENT '사진' -- 사진
)
COMMENT '구성품';

-- 구성품
ALTER TABLE component
	ADD CONSTRAINT PK_component -- 구성품 기본키
		PRIMARY KEY (
			cmp_no -- 구성품번호
		);

ALTER TABLE component
	MODIFY COLUMN cmp_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '구성품번호';

-- 매뉴얼분류
CREATE TABLE TABLE2 (
	COL  INTEGER     NOT NULL COMMENT '매뉴얼분류번호', -- 매뉴얼분류번호
	COL2 VARCHAR(50) NOT NULL COMMENT '분류명' -- 분류명
)
COMMENT '매뉴얼분류';

-- 매뉴얼분류
ALTER TABLE TABLE2
	ADD CONSTRAINT PK_TABLE2 -- 매뉴얼분류 기본키
		PRIMARY KEY (
			COL -- 매뉴얼분류번호
		);

-- 매뉴얼댓글추천
CREATE TABLE manual_rcm (
	member_no INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	m_cmt_no  INTEGER NOT NULL COMMENT '매뉴얼 댓글 번호' -- 매뉴얼 댓글 번호
)
COMMENT '매뉴얼댓글추천';

-- 매뉴얼댓글추천
ALTER TABLE manual_rcm
	ADD CONSTRAINT PK_manual_rcm -- 매뉴얼댓글추천 기본키
		PRIMARY KEY (
			member_no, -- 회원 번호
			m_cmt_no   -- 매뉴얼 댓글 번호
		);

-- 제품필수명세항목값
CREATE TABLE TABLE4 (
	product_no INTEGER            NOT NULL COMMENT '제품번호', -- 제품번호
	espec_no   INTEGER            NOT NULL COMMENT '제품명세항목번호', -- 제품명세항목번호
	COL        <데이터 타입 없음> NULL     COMMENT '내용' -- 내용
)
COMMENT '제품필수명세항목값';

-- 제품필수명세항목값
ALTER TABLE TABLE4
	ADD CONSTRAINT PK_TABLE4 -- 제품필수명세항목값 기본키
		PRIMARY KEY (
			product_no, -- 제품번호
			espec_no    -- 제품명세항목번호
		);

-- 제품명세기타항목
CREATE TABLE TABLE5 (
	COL2       <데이터 타입 없음> NOT NULL COMMENT '제품명세기타항목번호', -- 제품명세기타항목번호
	product_no INTEGER            NULL     COMMENT '제품번호', -- 제품번호
	COL        <데이터 타입 없음> NULL     COMMENT '항목명', -- 항목명
	COL3       <데이터 타입 없음> NULL     COMMENT '항목값' -- 항목값
)
COMMENT '제품명세기타항목';

-- 제품명세기타항목
ALTER TABLE TABLE5
	ADD CONSTRAINT PK_TABLE5 -- 제품명세기타항목 기본키
		PRIMARY KEY (
			COL2 -- 제품명세기타항목번호
		);

-- 리뷰댓글추천
CREATE TABLE review_rcm (
	rv_no     INTEGER NOT NULL COMMENT '리뷰 번호', -- 리뷰 번호
	rv_cmt_no INTEGER NOT NULL COMMENT '리뷰 댓글 번호' -- 리뷰 댓글 번호
)
COMMENT '리뷰댓글추천';

-- 리뷰댓글추천
ALTER TABLE review_rcm
	ADD CONSTRAINT PK_review_rcm -- 리뷰댓글추천 기본키
		PRIMARY KEY (
			rv_no,     -- 리뷰 번호
			rv_cmt_no  -- 리뷰 댓글 번호
		);

-- 자유게시판댓글 추천
CREATE TABLE fboard_rcm (
	member_no INTEGER NOT NULL COMMENT '회원 번호', -- 회원 번호
	fb_cmt_no INTEGER NOT NULL COMMENT '자유게시판 댓글 번호' -- 자유게시판 댓글 번호
)
COMMENT '자유게시판댓글 추천';

-- 자유게시판댓글 추천
ALTER TABLE fboard_rcm
	ADD CONSTRAINT PK_fboard_rcm -- 자유게시판댓글 추천 기본키
		PRIMARY KEY (
			member_no, -- 회원 번호
			fb_cmt_no  -- 자유게시판 댓글 번호
		);

-- 주의사항
CREATE TABLE precautions (
	pcautions_no INTEGER      NOT NULL COMMENT '주의사항번호', -- 주의사항번호
	manual_no    INTEGER      NOT NULL COMMENT '메뉴얼번호', -- 메뉴얼번호
	titl         VARCHAR(50)  NOT NULL COMMENT '제목', -- 제목
	contents     TEXT         NOT NULL COMMENT '내용', -- 내용
	media        VARCHAR(255) NULL     COMMENT '미디어' -- 미디어
)
COMMENT '주의사항';

-- 주의사항
ALTER TABLE precautions
	ADD CONSTRAINT PK_precautions -- 주의사항 기본키
		PRIMARY KEY (
			pcautions_no -- 주의사항번호
		);

ALTER TABLE precautions
	MODIFY COLUMN pcautions_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '주의사항번호';

-- 새 테이블
CREATE TABLE TABLE7 (
)
COMMENT '새 테이블';

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

-- 제품필수명세항목
ALTER TABLE essential_spec
	ADD CONSTRAINT FK_small_category_TO_essential_spec -- 제품 소분류 -> 제품필수명세항목
		FOREIGN KEY (
			sctg_no -- 제품소분류번호
		)
		REFERENCES small_category ( -- 제품 소분류
			sctg_no -- 제품소분류번호
		);

-- 추가 정보
ALTER TABLE add_spec
	ADD CONSTRAINT FK_essential_spec_TO_add_spec -- 제품필수명세항목 -> 추가 정보
		FOREIGN KEY (
			espec_no -- 제품명세항목번호
		)
		REFERENCES essential_spec ( -- 제품필수명세항목
			espec_no -- 제품명세항목번호
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

-- 관리자
ALTER TABLE manager
	ADD CONSTRAINT FK_member_TO_manager -- 회원 -> 관리자
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
	ADD CONSTRAINT FK_quetion_category_TO_faq -- 질문카테고리 -> 자주묻는질문
		FOREIGN KEY (
			qctg_no -- 질문카테고리번호
		)
		REFERENCES quetion_category ( -- 질문카테고리
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

-- 중고 게시판
ALTER TABLE used_board
	ADD CONSTRAINT FK_prod_status_TO_used_board -- 제품상태 -> 중고 게시판
		FOREIGN KEY (
			pstat_no -- 제품상태번호
		)
		REFERENCES prod_status ( -- 제품상태
			pstat_no -- 제품상태번호
		);

-- 중고 게시판
ALTER TABLE used_board
	ADD CONSTRAINT FK_member_TO_used_board -- 회원 -> 중고 게시판
		FOREIGN KEY (
			member_no -- 회원 번호
		)
		REFERENCES member ( -- 회원
			member_no -- 회원 번호
		);

-- 중고 댓글
ALTER TABLE uboard_cmt
	ADD CONSTRAINT FK_used_board_TO_uboard_cmt -- 중고 게시판 -> 중고 댓글
		FOREIGN KEY (
			ubno -- 게시물 번호
		)
		REFERENCES used_board ( -- 중고 게시판
			ubno -- 게시물 번호
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

-- 제품필수명세항목값
ALTER TABLE TABLE4
	ADD CONSTRAINT FK_product_TO_TABLE4 -- 제품 -> 제품필수명세항목값
		FOREIGN KEY (
			product_no -- 제품번호
		)
		REFERENCES product ( -- 제품
			product_no -- 제품번호
		);

-- 제품필수명세항목값
ALTER TABLE TABLE4
	ADD CONSTRAINT FK_essential_spec_TO_TABLE4 -- 제품필수명세항목 -> 제품필수명세항목값
		FOREIGN KEY (
			espec_no -- 제품명세항목번호
		)
		REFERENCES essential_spec ( -- 제품필수명세항목
			espec_no -- 제품명세항목번호
		);

-- 제품명세기타항목
ALTER TABLE TABLE5
	ADD CONSTRAINT FK_product_TO_TABLE5 -- 제품 -> 제품명세기타항목
		FOREIGN KEY (
			product_no -- 제품번호
		)
		REFERENCES product ( -- 제품
			product_no -- 제품번호
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