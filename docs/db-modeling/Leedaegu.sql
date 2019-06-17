
ALTER TABLE member
add file_path varchar(255) NOT NULL DEFAULT 'user.jpg';

ALTER TABLE member
add pwd_udt datetime NULL;

ALTER TABLE member
add sns_type int NULL;