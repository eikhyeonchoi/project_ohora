
--alter table manufacturer drop reg_no;
--
--alter table manufacturer add reg_no varchar(20) NOT NULL UNIQUE KEY;
--
--ALTER TABLE notice
--
--MODIFY COLUMN ntc_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '공지사항 번호';
--
--ALTER TABLE manufacturer MODIFY reg_no varchar(30);
--
--alter table manufacturer add member_no integer null;
--
--alter table manufacturer add constraint member_no foreign key(member_no)
--references member (member_no);

--ALTER TABLE member MODIFY type varchar(30);

--alter table tip_history add nickName varchar(30) not null;

--alter table member add unique key (n_name);

--ALTER TABLE manufacturer ADD address VARCHAR(100);

--alter table fboard_cmt add column parent_id int not null;
--alter table fboard_cmt add column depth int not null;

--alter table question add titl varchar(100) not null;

--alter table question drop file;

--alter table answer drop file;

--create table question_file(  --문의게시판 파일 테이블 추가
--question_file_no INTEGER  NOT NULL,
--question_no    INTEGER    NOT NULL,
--file_path varchar(250)    NOT NULL);

--ALTER TABLE question_file -- 기본키 추가
--ADD CONSTRAINT PK_question_file
--PRIMARY KEY (
--question_file_no 
--);

--ALTER TABLE question_file
--MODIFY COLUMN question_file_no INTEGER NOT NULL AUTO_INCREMENT;

--alter table question_file add constraint question_no foreign key(question_no)
--references question (q_no);

--create table answer_file( 
--answer_file_no INTEGER  NOT NULL,
--ans_no         INTEGER    NOT NULL,
--file_path varchar(250)    NOT NULL);

--ALTER TABLE answer_file -- 기본키 추가
--ADD CONSTRAINT PK_answer_file
--PRIMARY KEY (
--answer_file_no 
--);

--ALTER TABLE answer_file
--MODIFY COLUMN answer_file_no INTEGER NOT NULL AUTO_INCREMENT;

--alter table answer_file add constraint ans_no foreign key(ans_no)
--references answer (ans_no);

--alter table question add status varchar(30);
--
--ALTER TABLE question
--MODIFY COLUMN status varchar(30) NOT NULL DEFAULT '답변 대기중';
