-- 제품대분류, 제품소분류,  제품, 제조사
-- 질문카테고리(자주묻는질문에서), 질문유형(고객문의 게시판에서), 회원
-- 고정값이 필요한 테이블만 임시데이터 넣음
-- 나머지는 개발할 때 필요하면 넣으면됨

-- large_category 임시 값 "제품대분류"
insert into large_category(name) values('태블릿, 모바일'); --1
insert into large_category(name) values('노트북, PC'); --2
insert into large_category(name) values('카메라'); --3
insert into large_category(name) values('가전제품'); --4

-- small_category 임시 값 "제품소분류"
insert into small_category(lctg_no, name) values(1, '휴대폰/스마트폰'); --1
insert into small_category(lctg_no, name) values(1, '태블릿/전자책'); --2
insert into small_category(lctg_no, name) values(1, '스마트워치/VR'); --3
insert into small_category(lctg_no, name) values(1, '악세사리'); --4

insert into small_category(lctg_no, name) values(2, '노트북'); --5
insert into small_category(lctg_no, name) values(2, '데스크탑'); --6
insert into small_category(lctg_no, name) values(2, 'PC부품'); --7
insert into small_category(lctg_no, name) values(2, 'PC저장장치'); --8

insert into small_category(lctg_no, name) values(3, '디지털카메라'); --9
insert into small_category(lctg_no, name) values(3, '캠코더'); --10
insert into small_category(lctg_no, name) values(3, '카메라렌즈'); --11
insert into small_category(lctg_no, name) values(3, '카메라저장장치'); --12

insert into small_category(lctg_no, name) values(4, '세탁기'); --13
insert into small_category(lctg_no, name) values(4, 'TV'); --14
insert into small_category(lctg_no, name) values(4, '냉장고'); --15
insert into small_category(lctg_no, name) values(4, '에어컨'); --16

-- member 임시값 '회원'
insert into member(email, pwd, name, tel, n_name, type, ban) values('user1@test.com',password('1111'),'김지성','1234-1234','일반회원1','1',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('user2@test.com',password('2222'),'김의주','2222-2222','일반회원2','1',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('user3@test.com',password('3333'),'우승완','3333-3333','일반회원3','1',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('company1@test.com',password('1111'),'이대구','1234-1234','기업회원1','2',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('company2@test.com',password('2222'),'최익현','1234-1234','기업회원2','2',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('company3@test.com',password('3333'),'정연','1234-1234','기업회원3','2',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('manager1@test.com',password('1111'),'모모','1234-1234','관리자1','3',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('manager2@test.com',password('2222'),'쯔위','1234-1234','관리자2','3',false);
insert into member(email, pwd, name, tel, n_name, type, ban) values('manager3@test.com',password('3333'),'지효','1234-1234','관리자3','3',false);

--product 임시값 "제품"
insert into product(sctg_no, manufac_no, name) values(1,1,'갤럭시S10');
insert into product(sctg_no, manufac_no, name) values(1,1,'갤럭시노트10');
insert into product(sctg_no, manufac_no, name) values(2,1,'갤럭시탭S5');
insert into product(sctg_no, manufac_no, name) values(2,1,'갤럭시탭S4');
insert into product(sctg_no, manufac_no, name) values(3,1,'갤럭시기어핏2');
insert into product(sctg_no, manufac_no, name) values(3,1,'갤럭시기어핏2 pro');
insert into product(sctg_no, manufac_no, name) values(4,1,'갤럭시버즈');
insert into product(sctg_no, manufac_no, name) values(4,1,'삼성/악세사리 EP-PN920');
insert into product(sctg_no, manufac_no, name) values(4,1,'삼성/악세사리 EP-PG950');
insert into product(sctg_no, manufac_no, name) values(5,1,'삼성/노트북 Pen S NT950SBV-A58A');
insert into product(sctg_no, manufac_no, name) values(5,1,'삼성/노트북 Odyssey NT850XBX-GD7A');
insert into product(sctg_no, manufac_no, name) values(6,1,'삼성/데스크탑 DM500T8Z-AD3A WIN10');
insert into product(sctg_no, manufac_no, name) values(6,1,'삼성/S데스크탑 DM500S8Z-AD5BA-M8');
insert into product(sctg_no, manufac_no, name) values(7,1,'삼성pc부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,1,'삼성pc부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,1,'삼성pc저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,1,'삼성pc저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,1,'삼성디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,1,'삼성디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,1,'삼성캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,1,'삼성캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,1,'삼성카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,1,'삼성카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,1,'삼성카메라카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,1,'삼성카메라카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,1,'삼성/세탁기1 액티브워시 WA14N6781TG');
insert into product(sctg_no, manufac_no, name) values(13,1,'삼성/세탁기2 워블 WA16M6551KS');
insert into product(sctg_no, manufac_no, name) values(14,1,'삼성/TV1 시리즈Q QN82Q6FN');
insert into product(sctg_no, manufac_no, name) values(14,1,'삼성/TV2 시리즈8 UN49NU8000F');
insert into product(sctg_no, manufac_no, name) values(15,1,'삼성/냉장고1 T9000 RF85M96427Z');
insert into product(sctg_no, manufac_no, name) values(15,1,'삼성/냉장고2 RS82M6000SA');
insert into product(sctg_no, manufac_no, name) values(16,1,'삼성/에어컨1 무풍에어컨 AF16N5779WZR');
insert into product(sctg_no, manufac_no, name) values(16,1,'삼성/에어컨2 무풍에어컨 AF19R7573WSR');

insert into product(sctg_no, manufac_no, name) values(1,2,'아이폰x');
insert into product(sctg_no, manufac_no, name) values(1,2,'아이폰8');
insert into product(sctg_no, manufac_no, name) values(2,2,'아이패드4');
insert into product(sctg_no, manufac_no, name) values(2,2,'아이패드3');
insert into product(sctg_no, manufac_no, name) values(3,2,'애플왓치2');
insert into product(sctg_no, manufac_no, name) values(3,2,'애플왓치4');
insert into product(sctg_no, manufac_no, name) values(4,2,'에어팟1');
insert into product(sctg_no, manufac_no, name) values(4,2,'에어팟2');
insert into product(sctg_no, manufac_no, name) values(5,2,'맥북에어');
insert into product(sctg_no, manufac_no, name) values(5,2,'맥북프로');
insert into product(sctg_no, manufac_no, name) values(6,2,'애플데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,2,'애플데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,2,'애플 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,2,'애플 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,2,'애플 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,2,'애플 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,2,'애플 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,2,'애플 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,2,'애플 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,2,'애플 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,2,'애플 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,2,'애플 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,2,'애플 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,2,'애플 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,2,'애플 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,2,'애플 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,2,'애플 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,2,'애플 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,2,'애플 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,2,'애플 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,2,'애플 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,2,'애플 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,3,'LG스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,3,'LG스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,3,'LG태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,3,'LG태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,3,'LG스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,3,'LG스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,3,'LG악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,3,'LG악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,3,'LG노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,3,'LG노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,3,'LG데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,3,'LG데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,3,'LG PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,3,'LG PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,3,'LG PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,3,'LG PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,3,'LG 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,3,'LG 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,3,'LG 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,3,'LG 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,3,'LG 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,3,'LG 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,3,'LG 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,3,'LG 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,3,'LG 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,3,'LG 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,3,'LG TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,3,'LG TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,3,'LG 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,3,'LG 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,3,'LG 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,3,'LG 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,4,'한성스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,4,'한성스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,4,'한성태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,4,'한성태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,4,'한성스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,4,'한성스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,4,'한성악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,4,'한성악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,4,'한성노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,4,'한성노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,4,'한성데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,4,'한성데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,4,'한성 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,4,'한성 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,4,'한성 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,4,'한성 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,4,'한성 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,4,'한성 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,4,'한성 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,4,'한성 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,4,'한성 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,4,'한성 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,4,'한성 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,4,'한성 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,4,'한성 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,4,'한성 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,4,'한성 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,4,'한성 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,4,'한성 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,4,'한성 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,4,'한성 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,4,'한성 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,5,'니콘스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,5,'니콘스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,5,'니콘태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,5,'니콘태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,5,'니콘스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,5,'니콘스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,5,'니콘악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,5,'니콘악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,5,'니콘노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,5,'니콘노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,5,'니콘데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,5,'니콘데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,5,'니콘 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,5,'니콘 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,5,'니콘 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,5,'니콘 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,5,'니콘 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,5,'니콘 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,5,'니콘 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,5,'니콘 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,5,'니콘 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,5,'니콘 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,5,'니콘 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,5,'니콘 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,5,'니콘 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,5,'니콘 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,5,'니콘 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,5,'니콘 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,5,'니콘 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,5,'니콘 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,5,'니콘 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,5,'니콘 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,6,'캐논스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,6,'캐논스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,6,'캐논태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,6,'캐논태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,6,'캐논스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,6,'캐논스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,6,'캐논악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,6,'캐논악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,6,'캐논노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,6,'캐논노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,6,'캐논데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,6,'캐논데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,6,'캐논 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,6,'캐논 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,6,'캐논 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,6,'캐논 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,6,'캐논 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,6,'캐논 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,6,'캐논 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,6,'캐논 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,6,'캐논 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,6,'캐논 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,6,'캐논 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,6,'캐논 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,6,'캐논 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,6,'캐논 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,6,'캐논 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,6,'캐논 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,6,'캐논 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,6,'캐논 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,6,'캐논 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,6,'캐논 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,7,'소니스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,7,'소니스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,7,'소니태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,7,'소니태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,7,'소니스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,7,'소니스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,7,'소니악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,7,'소니악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,7,'소니노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,7,'소니노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,7,'소니데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,7,'소니데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,7,'소니 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,7,'소니 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,7,'소니 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,7,'소니 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,7,'소니 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,7,'소니 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,7,'소니 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,7,'소니 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,7,'소니 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,7,'소니 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,7,'소니 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,7,'소니 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,7,'소니 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,7,'소니 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,7,'소니 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,7,'소니 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,7,'소니 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,7,'소니 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,7,'소니 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,7,'소니 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,8,'인텔스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,8,'인텔스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,8,'인텔태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,8,'인텔태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,8,'인텔스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,8,'인텔스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,8,'인텔악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,8,'인텔악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,8,'인텔노트북 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,8,'인텔노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,8,'인텔데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,8,'인텔데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,8,'인텔 PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,8,'인텔 PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,8,'인텔 PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,8,'인텔 PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,8,'인텔 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,8,'인텔 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,8,'인텔 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,8,'인텔 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,8,'인텔 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,8,'인텔 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,8,'인텔 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,8,'인텔 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,8,'인텔 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,8,'인텔 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,8,'인텔 TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,8,'인텔 TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,8,'인텔 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,8,'인텔 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,8,'인텔 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,8,'인텔 에어컨 임시값2');

insert into product(sctg_no, manufac_no, name) values(1,9,'AMD스마트폰 임시값1');
insert into product(sctg_no, manufac_no, name) values(1,9,'AMD스마트폰 임시값2');
insert into product(sctg_no, manufac_no, name) values(2,9,'AMD태블릿 임시값1');
insert into product(sctg_no, manufac_no, name) values(2,9,'AMD태블릿 임시값2');
insert into product(sctg_no, manufac_no, name) values(3,9,'AMD스마트워치 임시값1');
insert into product(sctg_no, manufac_no, name) values(3,9,'AMD스마트워치 임시값2');
insert into product(sctg_no, manufac_no, name) values(4,9,'AMD악세사리 임시값1');
insert into product(sctg_no, manufac_no, name) values(4,9,'AMD악세사리 임시값2');
insert into product(sctg_no, manufac_no, name) values(5,9,'AMD노트북회원 임시값1');
insert into product(sctg_no, manufac_no, name) values(5,9,'AMD노트북 임시값2');
insert into product(sctg_no, manufac_no, name) values(6,9,'AMD데스크탑 임시값1');
insert into product(sctg_no, manufac_no, name) values(6,9,'AMD데스크탑 임시값2');
insert into product(sctg_no, manufac_no, name) values(7,9,'AMD PC부품 임시값1');
insert into product(sctg_no, manufac_no, name) values(7,9,'AMD PC부품 임시값2');
insert into product(sctg_no, manufac_no, name) values(8,9,'AMD PC저장장치 임시값1');
insert into product(sctg_no, manufac_no, name) values(8,9,'AMD PC저장장치 임시값2');
insert into product(sctg_no, manufac_no, name) values(9,9,'AMD 디카 임시값1');
insert into product(sctg_no, manufac_no, name) values(9,9,'AMD 디카 임시값2');
insert into product(sctg_no, manufac_no, name) values(10,9,'AMD 캠코더 임시값1');
insert into product(sctg_no, manufac_no, name) values(10,9,'AMD 캠코더 임시값2');
insert into product(sctg_no, manufac_no, name) values(11,9,'AMD 카메라렌즈 임시값1');
insert into product(sctg_no, manufac_no, name) values(11,9,'AMD 카메라렌즈 임시값2');
insert into product(sctg_no, manufac_no, name) values(12,9,'AMD 카메라저장 임시값1');
insert into product(sctg_no, manufac_no, name) values(12,9,'AMD 카메라저장 임시값2');
insert into product(sctg_no, manufac_no, name) values(13,9,'AMD 세탁기 임시값1');
insert into product(sctg_no, manufac_no, name) values(13,9,'AMD 세탁기 임시값2');
insert into product(sctg_no, manufac_no, name) values(14,9,'AMD TV 임시값1');
insert into product(sctg_no, manufac_no, name) values(14,9,'AMD TV 임시값2');
insert into product(sctg_no, manufac_no, name) values(15,9,'AMD 냉장고 임시값1');
insert into product(sctg_no, manufac_no, name) values(15,9,'AMD 냉장고 임시값2');
insert into product(sctg_no, manufac_no, name) values(16,9,'AMD 에어컨 임시값1');
insert into product(sctg_no, manufac_no, name) values(16,9,'AMD 에어컨 임시값2');

-- question_category 임시값 '질문 카테고리' (자주묻는질문)
insert into question_category(name) values('질문 유형 1');
insert into question_category(name) values('질문 유형 2');
insert into question_category(name) values('질문 유형 3');
insert into question_category(name) values('질문 유형 4');
insert into question_category(name) values('질문 유형 5');

--manufacturer 임시값 "제조사"
insert into manufacturer(reg_no, name, tel, homepage) values('111-11-11111', '삼성전자','1234-1234', 'https://www.samsung.com/'); --1
insert into manufacturer(reg_no, name, tel, homepage) values('222-22-22222', '애플','5467-1234', 'https://www.apple.com/'); -- 2
insert into manufacturer(reg_no, name, tel, homepage) values('333-33-33333', 'LG전자','6785-1234', 'https://www.lge.co.kr');--3
insert into manufacturer(reg_no, name, tel, homepage) values('444-44-44444', '한성컴퓨터','1835-1234', 'http://www.monsterlabs.co.kr/'); --4
insert into manufacturer(reg_no, name, tel, homepage) values('555-55-55555', '니콘','4521-1234', 'https://www.nikon-image.co.kr/'); --5
insert into manufacturer(reg_no, name, tel, homepage) values('666-66-66666', '캐논','8567-1234', 'https://kr.canon/ko'); -- 6
insert into manufacturer(reg_no, name, tel, homepage) values('777-77-77777', '소니코리아','8602-1234', 'https://www.sony.co.kr/'); --7
insert into manufacturer(reg_no, name, tel, homepage) values('888-88-88888', '인텔','5621-1234', 'https://www.intel.co.kr/'); --8
insert into manufacturer(reg_no, name, tel, homepage) values('999-99-9999', 'AMD','5832-1234', 'https://www.amd.com/ko'); --9
insert into manufacturer(reg_no, name, tel, homepage, member_no) values('111-44-777', 'bit-1','3424-1234', 'https://www.bit.com/ko', 4); --10
insert into manufacturer(reg_no, name, tel, homepage, member_no) values('222-55-888', 'bit-2','2321-1234', 'https://www.camp.com/ko', 5); --11
insert into manufacturer(reg_no, name, tel, homepage, member_no) values('333-66-9999', 'bit-3','6431-1234', 'https://www.ohora.com/ko', 6); --12



