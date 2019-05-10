alter table manufacturer drop reg_no;

alter table manufacturer add reg_no varchar(20) NOT NULL UNIQUE KEY;

ALTER TABLE notice

MODIFY COLUMN ntc_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '공지사항 번호';

ALTER TABLE manufacturer MODIFY reg_no varchar(30);