package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ReviewDao;
import bitcamp.team.domain.Review;
import bitcamp.team.service.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService {

  ReviewDao reviewDao;

  public ReviewServiceImpl(ReviewDao reviewDao) {
    this.reviewDao = reviewDao;
  }

  @Override
  public List<Review> get(int no, String keyword, String searchType) {
    HashMap<String, Object> params = new HashMap<>();
    params.put("selectNo", no);
    params.put("searchType", searchType);
    params.put("keyword", keyword);
    switch (searchType) {
      case "name":
        params.put("name", searchType);
        break;
      case "title":
        params.put("title", searchType);
        break;
      case "contents":
        params.put("contents", searchType);
        break;
      case "all":
        params.put("all", searchType);
        break;
      default:;
    }
    if (keyword != null) {
      if (!keyword.equals("")) {
        params.put("keyword", keyword);
      }
    }
    return reviewDao.findByNo(params);
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


}
