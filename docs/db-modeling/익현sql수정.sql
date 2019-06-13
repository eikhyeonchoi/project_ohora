alter table faq_type change qctg_no faq_type_no int not null auto_increment;

alter table faq change qctg_no faq_type_no int not null;

// 6월 11일 추가
alter table satisfy add eval varchar(300) null default '';


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
임시값
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

insert into faq_type(name) values('회원관련FAQ');
insert into faq_type(name) values('팁게시판FAQ');
insert into faq_type(name) values('메뉴얼FAQ');
insert into faq_type(name) values('제품관련FAQ');

insert into 
  faq(faq_type_no, titl, conts) 
values(5,
  '회원가입은 어떻게 이뤄지나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(5,
  '회원변경은 어떻게 이뤄지나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
insert into 
  faq(faq_type_no, titl, conts) 
values(5,
  '회원탈퇴은 어떻게 이뤄지나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(5,
  '이메일인증은 어떻게 이뤄지나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');

  
  
insert into 
  faq(faq_type_no, titl, conts) 
values(6,
  '제품 당 팁게시판은 한개 인건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(6,
  '제품 당 팁 게시판을 여러개로 만들어 주세요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
insert into 
  faq(faq_type_no, titl, conts) 
values(6,
  '팁게시판에 욕설이 있는 경우가 잦은데 어떻게 처리하나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(6,
  '팁게시판 수정은 비회원은 되지 않는건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
  
  
insert into 
  faq(faq_type_no, titl, conts) 
values(7,
  '비회원도 메뉴얼 게시판을 볼 수 있는건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(7,
  '메뉴얼이 없는 제품의 대해서 메뉴얼 요청을 할 수 있나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
insert into 
  faq(faq_type_no, titl, conts) 
values(7,
  '일반회원인 경우 메뉴얼을 추가할 수 없는건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(7,
  '메뉴얼 댓글은 비회원은 작성 못하는 건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
  
insert into 
  faq(faq_type_no, titl, conts) 
values(7,
  '비회원도 메뉴얼 게시판을 볼 수 있는건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
  
  
insert into 
  faq(faq_type_no, titl, conts) 
values(8,
  '일반회원은 제품을 등록할 수 없나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(8,
  '제품의 대한 만족도 평가는 회원당 한번만 가능한건가요  ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(8,
  '제품 게시판은 비회원도 이용가능한가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(8,
  '제품의 대한 리뷰는 비회원도 볼 수 있나요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
insert into 
  faq(faq_type_no, titl, conts) 
values(8,
  '제품 게시판은 ajax를 사용해서 구현하신건가요 ???',
  '자주묻는질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는 질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용 자주묻는질문 내용');
  
  
insert into fboard(member_no, titl, conts) values(1, '제목01','내용01');
insert into fboard(member_no, titl, conts) values(1, '제목02','내용02');
insert into fboard(member_no, titl, conts) values(1, '제목03','내용03');
insert into fboard(member_no, titl, conts) values(1, '제목04','내용04');
insert into fboard(member_no, titl, conts) values(1, '제목05','내용05');
insert into fboard(member_no, titl, conts) values(1, '제목06','내용06');
insert into fboard(member_no, titl, conts) values(1, '제목07','내용07');
insert into fboard(member_no, titl, conts) values(1, '제목08','내용08');
insert into fboard(member_no, titl, conts) values(1, '제목09','내용09');
insert into fboard(member_no, titl, conts) values(1, '제목10','내용10');
insert into fboard(member_no, titl, conts) values(1, '제목11','내용11');
insert into fboard(member_no, titl, conts) values(1, '제목12','내용12');
insert into fboard(member_no, titl, conts) values(1, '제목13','내용13');
insert into fboard(member_no, titl, conts) values(1, '제목14','내용14');
insert into fboard(member_no, titl, conts) values(1, '제목15','내용15');
insert into fboard(member_no, titl, conts) values(1, '제목16','내용16');
insert into fboard(member_no, titl, conts) values(1, '제목17','내용17');
insert into fboard(member_no, titl, conts) values(1, '제목18','내용18');
insert into fboard(member_no, titl, conts) values(1, '제목19','내용19');
insert into fboard(member_no, titl, conts) values(1, '제목20','내용20');
insert into fboard(member_no, titl, conts) values(1, '제목21','내용21');
insert into fboard(member_no, titl, conts) values(1, '제목22','내용22');
insert into fboard(member_no, titl, conts) values(1, '제목23','내용23');
insert into fboard(member_no, titl, conts) values(1, '제목24','내용24');
insert into fboard(member_no, titl, conts) values(1, '제목25','내용25');
insert into fboard(member_no, titl, conts) values(1, '제목26','내용26');
insert into fboard(member_no, titl, conts) values(1, '제목27','내용27');
insert into fboard(member_no, titl, conts) values(1, '제목28','내용28');
insert into fboard(member_no, titl, conts) values(1, '제목29','내용29');
insert into fboard(member_no, titl, conts) values(1, '제목30','내용30');
insert into fboard(member_no, titl, conts) values(1, '제목31','내용31');
insert into fboard(member_no, titl, conts) values(1, '제목32','내용32');
insert into fboard(member_no, titl, conts) values(1, '제목33','내용33');
insert into fboard(member_no, titl, conts) values(1, '제목34','내용34');
insert into fboard(member_no, titl, conts) values(1, '제목35','내용35');
insert into fboard(member_no, titl, conts) values(1, '제목36','내용36');
insert into fboard(member_no, titl, conts) values(1, '제목37','내용37');
insert into fboard(member_no, titl, conts) values(1, '제목38','내용38');
insert into fboard(member_no, titl, conts) values(1, '제목39','내용39');
insert into fboard(member_no, titl, conts) values(1, '제목40','내용40');
insert into fboard(member_no, titl, conts) values(1, '제목41','내용41');
insert into fboard(member_no, titl, conts) values(1, '제목42','내용42');
insert into fboard(member_no, titl, conts) values(1, '제목43','내용43');
insert into fboard(member_no, titl, conts) values(1, '제목44','내용44');
insert into fboard(member_no, titl, conts) values(1, '제목45','내용45');
insert into fboard(member_no, titl, conts) values(1, '제목46','내용46');
insert into fboard(member_no, titl, conts) values(1, '제목47','내용47');
insert into fboard(member_no, titl, conts) values(1, '제목48','내용48');
insert into fboard(member_no, titl, conts) values(1, '제목49','내용49');
insert into fboard(member_no, titl, conts) values(1, '제목50','내용50');

  
  
  
  
  
  
  
