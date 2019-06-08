create table notice_file (
  file_no int not null auto_increment primary key,
  notice_no int not null,
  name varchar(255) not null,

  constraint fk_notice_no foreign key (notice_no)
    references notice (ntc_no)
);

ALTER TABLE notice
  MODIFY COLUMN conts mediumtext NOT NULL;


