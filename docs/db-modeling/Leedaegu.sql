
ALTER TABLE member
add file_path varchar(255) NOT NULL DEFAULT 'user.jpg';

ALTER TABLE member
add pwd_udt datetime NULL;

// 0618 추가
// 페이스북 4
// 카카오톡 5
ALTER TABLE member
add sns_type int NULL;