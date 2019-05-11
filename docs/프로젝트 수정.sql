alter table manufacturer drop reg_no;

alter table manufacturer add reg_no varchar(20) NOT NULL UNIQUE KEY;

ALTER TABLE notice

MODIFY COLUMN ntc_no INTEGER NOT NULL AUTO_INCREMENT COMMENT '공지사항 번호';

ALTER TABLE manufacturer MODIFY reg_no varchar(30);

alter table member add manufac_no integer null;

ALTER TABLE member ADD CONSTRAINT manufacturerNo

FOREIGN KEY (manufac_no) REFERENCES manufacturer (manufac_no);

alter table member add manufac_no integer null;

alter table member add constraint manufac_no foreign key (manufac_no)

references manufacturer (manufac_no);
