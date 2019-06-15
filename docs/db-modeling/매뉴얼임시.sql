insert into manual(product_no, name) 
values(292,(select name from product where product_no = 292));
insert into manual(product_no, name) 
values(293,(select name from product where product_no = 293));
insert into manual(product_no, name) 
values(294,(select name from product where product_no = 294));
insert into manual(product_no, name) 
values(295,(select name from product where product_no = 295));
insert into manual(product_no, name) 
values(296,(select name from product where product_no = 296));
insert into manual(product_no, name) 
values(297,(select name from product where product_no = 297));
insert into manual(product_no, name) 
values(298,(select name from product where product_no = 298));
insert into manual(product_no, name) 
values(299,(select name from product where product_no = 299));
insert into manual(product_no, name) 
values(300,(select name from product where product_no = 300));
insert into manual(product_no, name) 
values(301,(select name from product where product_no = 301));
insert into manual(product_no, name) 
values(302,(select name from product where product_no = 302));
insert into manual(product_no, name) 
values(303,(select name from product where product_no = 303));
insert into manual(product_no, name) 
values(304,(select name from product where product_no = 304));
insert into manual(product_no, name) 
values(305,(select name from product where product_no = 305));
insert into manual(product_no, name) 
values(306,(select name from product where product_no = 306));
insert into manual(product_no, name) 
values(307,(select name from product where product_no = 307));
insert into manual(product_no, name) 
values(308,(select name from product where product_no = 308));
insert into manual(product_no, name) 
values(309,(select name from product where product_no = 309));
insert into manual(product_no, name) 
values(310,(select name from product where product_no = 310));
insert into manual(product_no, name) 
values(311,(select name from product where product_no = 311));
insert into manual(product_no, name) 
values(312,(select name from product where product_no = 312));
insert into manual(product_no, name) 
values(313,(select name from product where product_no = 313));
insert into manual(product_no, name) 
values(314,(select name from product where product_no = 314));
insert into manual(product_no, name) 
values(315,(select name from product where product_no = 315));
insert into manual(product_no, name) 
values(316,(select name from product where product_no = 316));
insert into manual(product_no, name) 
values(317,(select name from product where product_no = 317));
insert into manual(product_no, name) 
values(318,(select name from product where product_no = 318));
insert into manual(product_no, name) 
values(319,(select name from product where product_no = 319));

-- manual_file 임시값
insert into manual_file (manual_no, manual_type_no, conts, file)
values(16, 1, '일반 매뉴얼 내용입니다.', null);
insert into manual_file (manual_no, manual_type_no, conts, file)
values(16, 2, '구성품 매뉴얼 내용입니다.', null);
insert into manual_file (manual_no, manual_type_no, conts, file)
values(16, 3, '주의사항 매뉴얼 내용입니다.', null);
insert into manual_file (manual_no, manual_type_no, conts, file)
values(16, 4, '매뉴얼 댓글 내용입니다.', null);
insert into manual_file (manual_no, manual_type_no, conts, file)
values(16, 5, '요약 매뉴얼 내용입니다.', null);
