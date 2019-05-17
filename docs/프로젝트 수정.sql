alter table manufacturer drop reg_no;

alter table manufacturer add reg_no varchar(20) NOT NULL UNIQUE KEY;

ALTER TABLE notice

MODIFY COLUMN ntc_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '공지사항 번호';

ALTER TABLE manufacturer MODIFY reg_no varchar(30);

alter table manufacturer add member_no integer null;

alter table manufacturer add constraint member_no foreign key (member_no)

references member (member_no);

ALTER TABLE member MODIFY type varchar(30);

alter table tip_history add nickName varchar(30) not null;

alter table member add unique key (n_name);

ALTER TABLE manufacturer ADD address VARCHAR(100);