CREATE TABLE board (
   id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
   subject varchar(300) NOT NULL,
   content text,
   register_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
 );
  
CREATE TABLE board_reply (
   reply_id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
   board_id bigint,
   parent_id bigint,
   depth int,
   reply_content text,
   register_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
 );
 
 alter table board_reply add foreign key(board_id) references board(id);
