-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: testproj
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `ans_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '답변 번호',
  `q_no` int(11) NOT NULL COMMENT '질문 번호',
  `conts` text NOT NULL COMMENT '답변 내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `file` varchar(255) DEFAULT NULL COMMENT '첨부파일',
  PRIMARY KEY (`ans_no`),
  KEY `FK_question_TO_answer` (`q_no`),
  CONSTRAINT `FK_question_TO_answer` FOREIGN KEY (`q_no`) REFERENCES `question` (`q_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='고객문의답변';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `component` (
  `cmp_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '구성품번호',
  `manual_no` int(11) NOT NULL COMMENT '메뉴얼번호',
  `name` varchar(50) NOT NULL COMMENT '제목',
  `explanation` text NOT NULL COMMENT '설명',
  `img` varchar(255) DEFAULT NULL COMMENT '사진',
  PRIMARY KEY (`cmp_no`),
  KEY `FK_manual_TO_component` (`manual_no`),
  CONSTRAINT `FK_manual_TO_component` FOREIGN KEY (`manual_no`) REFERENCES `manual` (`manual_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='구성품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faq` (
  `faq_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '질문 번호',
  `qctg_no` int(11) NOT NULL COMMENT '질문카테고리번호',
  `conts` text NOT NULL COMMENT '내용',
  `titl` varchar(50) NOT NULL COMMENT '제목',
  PRIMARY KEY (`faq_no`),
  KEY `FK_quetion_category_TO_faq` (`qctg_no`),
  CONSTRAINT `FK_quetion_category_TO_faq` FOREIGN KEY (`qctg_no`) REFERENCES `quetion_category` (`qctg_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='자주묻는질문';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fboard`
--

DROP TABLE IF EXISTS `fboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fboard` (
  `fb_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `titl` varchar(50) NOT NULL COMMENT '제목',
  `conts` text NOT NULL COMMENT '내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `cnt` int(11) DEFAULT '0' COMMENT '조회수',
  PRIMARY KEY (`fb_no`),
  KEY `FK_member_TO_fboard` (`member_no`),
  CONSTRAINT `FK_member_TO_fboard` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COMMENT='자유게시판';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fboard`
--

LOCK TABLES `fboard` WRITE;
/*!40000 ALTER TABLE `fboard` DISABLE KEYS */;
INSERT INTO `fboard` VALUES (1,1,'게시판 제목 임시1','게시판 내용 임시1','2019-05-08 17:09:29',0),(2,2,'게시판 제목 임시2','게시판 내용 임시2','2019-05-08 17:09:58',0),(3,3,'게시판 제목 임시3','게시판 내용 임시3','2019-05-08 17:09:58',0),(4,4,'게시판 제목 임시4','게시판 내용 임시4','2019-05-08 17:09:58',4),(5,5,'게시판 제목 임시5','게시판 내용 임시5','2019-05-08 17:09:58',36),(6,5,'제목1','내용5','2019-05-08 20:34:30',0),(7,8,'456456456','4564564','2019-05-08 20:38:20',0),(8,6,'hohoho','5555555','2019-05-08 20:39:06',1),(9,5,'ccc','11','2019-05-09 09:39:59',0),(10,5,'1111','1111','2019-05-09 09:44:23',1),(11,6,'1111','1111','2019-05-09 09:44:59',1),(12,7,'1111','1111','2019-05-09 09:45:19',0),(13,6,'11','11','2019-05-09 09:46:40',0),(14,5,'111','111','2019-05-09 09:47:35',11),(15,6,'11','111','2019-05-09 09:48:10',0),(16,6,'11','55','2019-05-09 09:53:17',2),(17,6,'55','5555','2019-05-09 09:53:31',3),(18,1,'ㅁㄴㄹㄴㅇ','ㅇㅁㄴㅇㅁ','2019-05-09 10:27:50',5),(19,1,'5','5','2019-05-09 10:30:58',2),(20,6,'1111','1111','2019-05-09 11:50:27',24),(21,5,'1','5','2019-05-09 13:50:54',15),(40,6,'ad','as','2019-05-09 14:21:55',0),(41,7,'asd','asd','2019-05-09 14:23:46',1),(45,5,'asd','asd','2019-05-09 14:27:00',0),(46,5,'asd','ads','2019-05-09 14:27:36',0),(47,5,'ㅁㄴㅇ','ㅁㄴㅇ','2019-05-09 14:29:39',0),(48,5,'asd','ads','2019-05-09 14:33:57',0),(49,5,'af','asdad','2019-05-09 14:34:56',0),(50,1,'sad','asdas','2019-05-09 14:35:42',1);
/*!40000 ALTER TABLE `fboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fboard_cmt`
--

DROP TABLE IF EXISTS `fboard_cmt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fboard_cmt` (
  `fb_cmt_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '자유게시판 댓글 번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `fb_no` int(11) NOT NULL COMMENT '게시물 번호',
  `conts` text NOT NULL COMMENT '내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  PRIMARY KEY (`fb_cmt_no`),
  KEY `FK_member_TO_fboard_cmt` (`member_no`),
  KEY `FK_fboard_TO_fboard_cmt` (`fb_no`),
  CONSTRAINT `FK_fboard_TO_fboard_cmt` FOREIGN KEY (`fb_no`) REFERENCES `fboard` (`fb_no`),
  CONSTRAINT `FK_member_TO_fboard_cmt` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='자유게시판 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fboard_cmt`
--

LOCK TABLES `fboard_cmt` WRITE;
/*!40000 ALTER TABLE `fboard_cmt` DISABLE KEYS */;
/*!40000 ALTER TABLE `fboard_cmt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fboard_file`
--

DROP TABLE IF EXISTS `fboard_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fboard_file` (
  `fb_file_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호',
  `fb_no` int(11) NOT NULL COMMENT '게시물 번호',
  `file` varchar(255) NOT NULL COMMENT '첨부파일',
  PRIMARY KEY (`fb_file_no`),
  KEY `FK_fboard_TO_fboard_file` (`fb_no`),
  CONSTRAINT `FK_fboard_TO_fboard_file` FOREIGN KEY (`fb_no`) REFERENCES `fboard` (`fb_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='자게 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fboard_file`
--

LOCK TABLES `fboard_file` WRITE;
/*!40000 ALTER TABLE `fboard_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `fboard_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fboard_rcm`
--

DROP TABLE IF EXISTS `fboard_rcm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fboard_rcm` (
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `fb_cmt_no` int(11) NOT NULL COMMENT '자유게시판 댓글 번호',
  PRIMARY KEY (`member_no`,`fb_cmt_no`),
  KEY `FK_fboard_cmt_TO_fboard_rcm` (`fb_cmt_no`),
  CONSTRAINT `FK_fboard_cmt_TO_fboard_rcm` FOREIGN KEY (`fb_cmt_no`) REFERENCES `fboard_cmt` (`fb_cmt_no`),
  CONSTRAINT `FK_member_TO_fboard_rcm` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='자유게시판댓글 추천';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fboard_rcm`
--

LOCK TABLES `fboard_rcm` WRITE;
/*!40000 ALTER TABLE `fboard_rcm` DISABLE KEYS */;
/*!40000 ALTER TABLE `fboard_rcm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `large_category`
--

DROP TABLE IF EXISTS `large_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `large_category` (
  `lctg_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '제품대분류번호',
  `name` varchar(50) NOT NULL COMMENT '상위 카테고리 이름',
  PRIMARY KEY (`lctg_no`),
  UNIQUE KEY `UIX_large_category` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제품 대분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `large_category`
--

LOCK TABLES `large_category` WRITE;
/*!40000 ALTER TABLE `large_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `large_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual`
--

DROP TABLE IF EXISTS `manual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual` (
  `manual_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '메뉴얼번호',
  `product_no` int(11) NOT NULL COMMENT '제품번호',
  `conts` text NOT NULL COMMENT '매뉴얼 설명',
  `cnt` int(11) DEFAULT '0' COMMENT '조회수',
  `vlink` varchar(255) DEFAULT NULL COMMENT '동영상 링크',
  PRIMARY KEY (`manual_no`),
  KEY `FK_product_TO_manual` (`product_no`),
  CONSTRAINT `FK_product_TO_manual` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='매뉴얼';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual`
--

LOCK TABLES `manual` WRITE;
/*!40000 ALTER TABLE `manual` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_cmt`
--

DROP TABLE IF EXISTS `manual_cmt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_cmt` (
  `m_cmt_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '매뉴얼 댓글 번호',
  `manual_no` int(11) NOT NULL COMMENT '메뉴얼번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `conts` text NOT NULL COMMENT '내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  PRIMARY KEY (`m_cmt_no`),
  KEY `FK_member_TO_manual_cmt` (`member_no`),
  KEY `FK_manual_TO_manual_cmt` (`manual_no`),
  CONSTRAINT `FK_manual_TO_manual_cmt` FOREIGN KEY (`manual_no`) REFERENCES `manual` (`manual_no`),
  CONSTRAINT `FK_member_TO_manual_cmt` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='매뉴얼 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_cmt`
--

LOCK TABLES `manual_cmt` WRITE;
/*!40000 ALTER TABLE `manual_cmt` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual_cmt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_file`
--

DROP TABLE IF EXISTS `manual_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_file` (
  `mfile_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호',
  `manual_no` int(11) NOT NULL COMMENT '메뉴얼번호',
  `img` varchar(255) NOT NULL COMMENT '사진',
  `type` int(11) NOT NULL COMMENT '유형',
  PRIMARY KEY (`mfile_no`),
  KEY `FK_manual_TO_manual_file` (`manual_no`),
  CONSTRAINT `FK_manual_TO_manual_file` FOREIGN KEY (`manual_no`) REFERENCES `manual` (`manual_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='매뉴얼 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_file`
--

LOCK TABLES `manual_file` WRITE;
/*!40000 ALTER TABLE `manual_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manual_rcm`
--

DROP TABLE IF EXISTS `manual_rcm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manual_rcm` (
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `m_cmt_no` int(11) NOT NULL COMMENT '매뉴얼 댓글 번호',
  PRIMARY KEY (`member_no`,`m_cmt_no`),
  KEY `FK_manual_cmt_TO_manual_rcm` (`m_cmt_no`),
  CONSTRAINT `FK_manual_cmt_TO_manual_rcm` FOREIGN KEY (`m_cmt_no`) REFERENCES `manual_cmt` (`m_cmt_no`),
  CONSTRAINT `FK_member_TO_manual_rcm` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='매뉴얼댓글추천';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manual_rcm`
--

LOCK TABLES `manual_rcm` WRITE;
/*!40000 ALTER TABLE `manual_rcm` DISABLE KEYS */;
/*!40000 ALTER TABLE `manual_rcm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturer` (
  `manufac_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '제조사번호',
  `reg_no` int(11) NOT NULL COMMENT '사업자 등록번호',
  `name` varchar(50) NOT NULL COMMENT '회사명',
  `tel` varchar(30) NOT NULL COMMENT '전화번호',
  `homepage` varchar(255) DEFAULT NULL COMMENT '홈페이지',
  PRIMARY KEY (`manufac_no`),
  UNIQUE KEY `UIX_manufacturer` (`reg_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제조사';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '회원 번호',
  `email` varchar(40) NOT NULL COMMENT '이메일',
  `pwd` varchar(100) NOT NULL COMMENT '비밀번호',
  `name` varchar(50) NOT NULL COMMENT '이름',
  `tel` varchar(30) NOT NULL COMMENT '전화번호',
  `n_name` varchar(50) NOT NULL COMMENT '닉네임',
  `type` int(11) NOT NULL COMMENT '유형',
  `ban` tinyint(1) NOT NULL COMMENT '활성',
  PRIMARY KEY (`member_no`),
  UNIQUE KEY `UIX_member` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'user1@test.com','1111','이름1','1234-1234','일반회원1',1,0),(2,'user2@test.com','2222','이름2','2222-2222','일반회원2',1,0),(3,'user3@test.com','3333','이름3','3333-3333','일반회원3',1,0),(4,'company1@test.com','1111','기업회원1','1234-1234','기업회원1',2,0),(5,'company2@test.com','2222','기업회원2','1234-1234','기업회원2',2,0),(6,'company3@test.com','3333','기업회원3','1234-1234','기업회원3',2,0),(7,'manager1@test.com','1111','관리자1','1234-1234','관리자1',3,0),(8,'manager2@test.com','2222','관리자2','1234-1234','관리자2',3,0),(9,'manager3@test.com','3333','관리자3','1234-1234','관리자3',3,0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `ntc_no` int(11) NOT NULL COMMENT '공지사항 번호',
  `titl` varchar(50) NOT NULL COMMENT '공지사항 제목',
  `conts` text NOT NULL COMMENT '공지사항 내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `cnt` int(11) DEFAULT '0' COMMENT '조회수',
  PRIMARY KEY (`ntc_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='공지사항';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precautions`
--

DROP TABLE IF EXISTS `precautions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `precautions` (
  `pcautions_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '주의사항번호',
  `manual_no` int(11) NOT NULL COMMENT '메뉴얼번호',
  `titl` varchar(50) NOT NULL COMMENT '제목',
  `contents` text NOT NULL COMMENT '내용',
  `media` varchar(255) DEFAULT NULL COMMENT '미디어',
  PRIMARY KEY (`pcautions_no`),
  KEY `FK_manual_TO_precautions` (`manual_no`),
  CONSTRAINT `FK_manual_TO_precautions` FOREIGN KEY (`manual_no`) REFERENCES `manual` (`manual_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='주의사항';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precautions`
--

LOCK TABLES `precautions` WRITE;
/*!40000 ALTER TABLE `precautions` DISABLE KEYS */;
/*!40000 ALTER TABLE `precautions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '제품번호',
  `sctg_no` int(11) NOT NULL COMMENT '제품소분류번호',
  `manufac_no` int(11) NOT NULL COMMENT '제조사번호',
  `name` varchar(50) NOT NULL COMMENT '제품명',
  PRIMARY KEY (`product_no`),
  UNIQUE KEY `UIX_product` (`name`),
  KEY `FK_small_category_TO_product` (`sctg_no`),
  KEY `FK_manufacturer_TO_product` (`manufac_no`),
  CONSTRAINT `FK_manufacturer_TO_product` FOREIGN KEY (`manufac_no`) REFERENCES `manufacturer` (`manufac_no`),
  CONSTRAINT `FK_small_category_TO_product` FOREIGN KEY (`sctg_no`) REFERENCES `small_category` (`sctg_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제품';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_file`
--

DROP TABLE IF EXISTS `product_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_file` (
  `pfile_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호',
  `product_no` int(11) NOT NULL COMMENT '제품번호',
  `img` varchar(255) NOT NULL COMMENT '제품 사진',
  PRIMARY KEY (`pfile_no`),
  KEY `FK_product_TO_product_file` (`product_no`),
  CONSTRAINT `FK_product_TO_product_file` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제품 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_file`
--

LOCK TABLES `product_file` WRITE;
/*!40000 ALTER TABLE `product_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `q_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '질문 번호',
  `qtype_no` int(11) NOT NULL COMMENT '질문 유형 번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `conts` text NOT NULL COMMENT '질문 내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `file` varchar(255) DEFAULT NULL COMMENT '첨부파일',
  PRIMARY KEY (`q_no`),
  KEY `FK_question_type_TO_question` (`qtype_no`),
  KEY `FK_member_TO_question` (`member_no`),
  CONSTRAINT `FK_member_TO_question` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`),
  CONSTRAINT `FK_question_type_TO_question` FOREIGN KEY (`qtype_no`) REFERENCES `question_type` (`qtype_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='고객문의';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_type`
--

DROP TABLE IF EXISTS `question_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_type` (
  `qtype_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '질문 유형 번호',
  `conts` varchar(30) NOT NULL COMMENT '유형명',
  PRIMARY KEY (`qtype_no`),
  UNIQUE KEY `UIX_question_type` (`conts`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='고객문의유형';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_type`
--

LOCK TABLES `question_type` WRITE;
/*!40000 ALTER TABLE `question_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quetion_category`
--

DROP TABLE IF EXISTS `quetion_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quetion_category` (
  `qctg_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '질문카테고리번호',
  `name` varchar(50) NOT NULL COMMENT '카테고리 이름',
  PRIMARY KEY (`qctg_no`),
  UNIQUE KEY `UIX_quetion_category` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='질문카테고리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quetion_category`
--

LOCK TABLES `quetion_category` WRITE;
/*!40000 ALTER TABLE `quetion_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `quetion_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `rv_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '리뷰 번호',
  `product_no` int(11) NOT NULL COMMENT '제품 번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `name` varchar(50) NOT NULL COMMENT '리뷰명',
  `conts` text NOT NULL COMMENT '리뷰 내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `cnt` int(11) DEFAULT '0' COMMENT '리뷰 조회수',
  PRIMARY KEY (`rv_no`),
  KEY `FK_product_TO_review` (`product_no`),
  KEY `FK_member_TO_review` (`member_no`),
  CONSTRAINT `FK_member_TO_review` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`),
  CONSTRAINT `FK_product_TO_review` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='리뷰';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_cmt`
--

DROP TABLE IF EXISTS `review_cmt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_cmt` (
  `rv_cmt_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '리뷰 댓글 번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `rv_no` int(11) NOT NULL COMMENT '리뷰 번호',
  `conts` text NOT NULL COMMENT '내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  PRIMARY KEY (`rv_cmt_no`),
  KEY `FK_review_TO_review_cmt` (`rv_no`),
  KEY `FK_member_TO_review_cmt` (`member_no`),
  CONSTRAINT `FK_member_TO_review_cmt` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`),
  CONSTRAINT `FK_review_TO_review_cmt` FOREIGN KEY (`rv_no`) REFERENCES `review` (`rv_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='리뷰 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_cmt`
--

LOCK TABLES `review_cmt` WRITE;
/*!40000 ALTER TABLE `review_cmt` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_cmt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_file`
--

DROP TABLE IF EXISTS `review_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_file` (
  `rv_file_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '첨부파일 번호',
  `rv_no` int(11) NOT NULL COMMENT '리뷰 번호',
  `img` varchar(255) DEFAULT NULL COMMENT '리뷰 사진',
  `video` varchar(255) DEFAULT NULL COMMENT '리뷰 동영상',
  PRIMARY KEY (`rv_file_no`),
  KEY `FK_review_TO_review_file` (`rv_no`),
  CONSTRAINT `FK_review_TO_review_file` FOREIGN KEY (`rv_no`) REFERENCES `review` (`rv_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='리뷰 첨부파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_file`
--

LOCK TABLES `review_file` WRITE;
/*!40000 ALTER TABLE `review_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_rcm`
--

DROP TABLE IF EXISTS `review_rcm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_rcm` (
  `rv_no` int(11) NOT NULL COMMENT '리뷰 번호',
  `rv_cmt_no` int(11) NOT NULL COMMENT '리뷰 댓글 번호',
  PRIMARY KEY (`rv_no`,`rv_cmt_no`),
  KEY `FK_review_cmt_TO_review_rcm` (`rv_cmt_no`),
  CONSTRAINT `FK_review_TO_review_rcm` FOREIGN KEY (`rv_no`) REFERENCES `review` (`rv_no`),
  CONSTRAINT `FK_review_cmt_TO_review_rcm` FOREIGN KEY (`rv_cmt_no`) REFERENCES `review_cmt` (`rv_cmt_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='리뷰댓글추천';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_rcm`
--

LOCK TABLES `review_rcm` WRITE;
/*!40000 ALTER TABLE `review_rcm` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_rcm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `satisfy`
--

DROP TABLE IF EXISTS `satisfy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `satisfy` (
  `stf_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '만족도 정보 번호',
  `product_no` int(11) NOT NULL COMMENT '제품번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `level` double NOT NULL COMMENT '사용 난이도',
  `understand` double NOT NULL COMMENT '사용설명서 이해도',
  `dgn` double NOT NULL COMMENT '제품 디자인',
  `as_stf` double NOT NULL COMMENT 'A/S 만족도',
  `useful` double NOT NULL COMMENT '편의성',
  `price_stf` double NOT NULL COMMENT '가격 만족도',
  PRIMARY KEY (`stf_no`),
  KEY `FK_product_TO_satisfy` (`product_no`),
  KEY `FK_member_TO_satisfy` (`member_no`),
  CONSTRAINT `FK_member_TO_satisfy` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`),
  CONSTRAINT `FK_product_TO_satisfy` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제품만족도';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `satisfy`
--

LOCK TABLES `satisfy` WRITE;
/*!40000 ALTER TABLE `satisfy` DISABLE KEYS */;
/*!40000 ALTER TABLE `satisfy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `small_category`
--

DROP TABLE IF EXISTS `small_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `small_category` (
  `sctg_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '제품소분류번호',
  `lctg_no` int(11) NOT NULL COMMENT '제품대분류번호',
  `name` varchar(50) NOT NULL COMMENT '하위 카테고리 이름',
  PRIMARY KEY (`sctg_no`),
  UNIQUE KEY `UIX_small_category` (`name`),
  KEY `FK_large_category_TO_small_category` (`lctg_no`),
  CONSTRAINT `FK_large_category_TO_small_category` FOREIGN KEY (`lctg_no`) REFERENCES `large_category` (`lctg_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='제품 소분류';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `small_category`
--

LOCK TABLES `small_category` WRITE;
/*!40000 ALTER TABLE `small_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `small_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tip` (
  `tip_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '팁 번호',
  `product_no` int(11) NOT NULL COMMENT '제품번호',
  `member_no` int(11) NOT NULL COMMENT '회원 번호',
  `conts` text NOT NULL COMMENT '팁 내용',
  `cdt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  PRIMARY KEY (`tip_no`),
  KEY `FK_member_TO_tip` (`member_no`),
  KEY `FK_product_TO_tip` (`product_no`),
  CONSTRAINT `FK_member_TO_tip` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`),
  CONSTRAINT `FK_product_TO_tip` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='팁';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip`
--

LOCK TABLES `tip` WRITE;
/*!40000 ALTER TABLE `tip` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_history`
--

DROP TABLE IF EXISTS `tip_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tip_history` (
  `this_no` int(11) NOT NULL AUTO_INCREMENT COMMENT '히스토리 번호',
  `tip_no` int(11) NOT NULL COMMENT '팁 번호',
  `conts` text NOT NULL COMMENT '히스토리 내용',
  `udt` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '백업일',
  PRIMARY KEY (`this_no`),
  KEY `FK_tip_TO_tip_history` (`tip_no`),
  CONSTRAINT `FK_tip_TO_tip_history` FOREIGN KEY (`tip_no`) REFERENCES `tip` (`tip_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='팁 히스토리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_history`
--

LOCK TABLES `tip_history` WRITE;
/*!40000 ALTER TABLE `tip_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `tip_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-09 16:58:20
