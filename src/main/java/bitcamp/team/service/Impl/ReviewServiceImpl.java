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
}
