package bitcamp.team.service.Impl;

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
  public List<Review> list() {
    return reviewDao.findAll();
  }
  
  @Override
  public List<Review> get(int no) {
    return reviewDao.findByNo(no);
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
  public int delete(int no) {
    return reviewDao.delete(no);
  }
  
  @Override
  public int update(Review review) {
    return reviewDao.update(review);
  }
  
  @Override
  public int size(int no) {
      return reviewDao.countPage(no);
  }
  
  
}
