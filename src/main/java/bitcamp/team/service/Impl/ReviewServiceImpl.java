package bitcamp.team.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import bitcamp.team.dao.ReviewDao;
import bitcamp.team.domain.Review;
import bitcamp.team.domain.ReviewComment;
import bitcamp.team.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

  ReviewDao reviewDao;

  public ReviewServiceImpl(ReviewDao reviewDao) {
    this.reviewDao = reviewDao;
  }

  @Override
  public List<Review> get(int no, String keyword, String searchType) {
    HashMap<String, Object> param = new HashMap<>();
    param.put("selectNo", no);
    switch (searchType) {
      case "name":
    	  param.put("name", searchType);
        break;
      case "title":
    	  param.put("title", searchType);
        break;
      case "contents":
    	  param.put("contents", searchType);
        break;
      case "all":
    	  param.put("all", searchType);
        break;
      case "search":
    	  param.put("search", searchType);
        break;
      default:;
    }
    if (keyword != null) {
      if (!keyword.equals("")) {
    	  param.put("keyword", keyword);
      }
    }
    return reviewDao.findByNo(param);
  }

  @Override
  public Review get2(int no) {
    Review review = reviewDao.findByNo2(no);
    if (review != null) {
      reviewDao.increaseCount(no);
    }
    return review;
  }

  @Override
  public List<Review> findMyPageReview(int no) {
    return reviewDao.findMyPageReview(no);
  }

  @Override
  public int add(Review review) {
    return reviewDao.insert(review);
  }

  @Override
  public int delete(int no) {
    reviewDao.deleteCommentReview(no);
    return reviewDao.delete(no);
  }

  @Override
  public int update(Review review) {
    return reviewDao.update(review);
  }

  @Override
  public List<Review> list(String keyword) {
    return reviewDao.findProd(keyword);
  }

  @Override
  public int countByProdNo(int no) {
    return reviewDao.countByProdNo(no);
  }

  @Override
  public HashMap<String, Object> commentList(int no) {
    ArrayList<ReviewComment> requestList = (ArrayList<ReviewComment>) reviewDao.findCommentAll(no);
    HashMap<String, Object> content = new HashMap<String, Object>();

    content.put("list", requestList);

    return content;
  }

  // 댓글
  @Override
  public int addComment(ReviewComment reviewComment) {
    return reviewDao.insertComment(reviewComment);
  }

  @Override
  public int deleteComment(int no) {
    return reviewDao.deleteComment(no);
  }

  @Override
  public int updateComment(HashMap<String, Object> param) {
    return reviewDao.updateComment(param);
  }

  @Override
  public List<ReviewComment> findReply(HashMap<String, Object> param) {
    return reviewDao.findReply(param);
  }

}
