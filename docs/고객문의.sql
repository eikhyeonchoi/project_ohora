
-- 고객문의 카테고리 임시값
insert into question_type(conts) values('일반 문의'); --11
insert into question_type(conts) values('계정 문의'); --12
insert into question_type(conts) values('버그 제보'); --13
insert into question_type(conts) values('개선.제의'); --14
insert into question_type(conts) values('기타 문의'); --15

insert into question(qtype_no, member_no, titl, conts) values(11, 447, '일반 문의입니다.', '일반문의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(12, 447, '계정 문의입니다.', '계정문의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(13, 447, '버그제보 입니다.', '버그제보 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(14, 448, '개선.제의 입니다.', '개선.제의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(15, 448, '기타 문의입니다.', '기타문의 내용입니다.');

insert into question(qtype_no, member_no, titl, conts) values(11, 449, '일반 문의입니다.', '일반문의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(12, 449, '계정 문의입니다.', '계정문의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(13, 449, '버그제보 입니다.', '버그제보 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(14, 449, '개선.제의 입니다.', '개선.제의 내용입니다.');
insert into question(qtype_no, member_no, titl, conts) values(15, 449, '기타 문의입니다.', '기타문의 내용입니다.');


insert into answer(q_no, conts) values(6, '일반문의 답변입니다.');
insert into answer(q_no, conts) values(7, '계정문의 답변입니다.');
insert into answer(q_no, conts) values(8, '버그제보 답변입니다.');
insert into answer(q_no, conts) values(9, '개선.제의 답변입니다.');
insert into answer(q_no, conts) values(10, '기타문의 답변입니다.');





