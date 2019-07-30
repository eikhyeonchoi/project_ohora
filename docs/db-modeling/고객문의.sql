
-- 고객문의 카테고리 임시값
insert into faq_type(name) values('일반 문의'); --11
insert into faq_type(name) values('계정 문의'); --12
insert into faq_type(name) values('버그 제보'); --13
insert into faq_type(name) values('개선.제의'); --14
insert into faq_type(name) values('기타 문의'); --15

insert into faq(qtype_no, member_no, titl, conts) values(1, 1, '일반 문의입니다.', '일반문의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(2, 1, '계정 문의입니다.', '계정문의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(3, 1, '버그제보 입니다.', '버그제보 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(4, 1, '개선.제의 입니다.', '개선.제의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(5, 1, '기타 문의입니다.', '기타문의 내용입니다.');

insert into faq(qtype_no, member_no, titl, conts) values(1, 2, '일반 문의입니다.', '일반문의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(2, 2, '계정 문의입니다.', '계정문의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(3, 2, '버그제보 입니다.', '버그제보 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(4, 2, '개선.제의 입니다.', '개선.제의 내용입니다.');
insert into faq(qtype_no, member_no, titl, conts) values(5, 2, '기타 문의입니다.', '기타문의 내용입니다.');


insert into answer(q_no, conts) values(1, '일반문의 답변입니다.');
insert into answer(q_no, conts) values(2, '계정문의 답변입니다.');
insert into answer(q_no, conts) values(3, '버그제보 답변입니다.');
insert into answer(q_no, conts) values(4, '개선.제의 답변입니다.');
insert into answer(q_no, conts) values(5, '기타문의 답변입니다.');





