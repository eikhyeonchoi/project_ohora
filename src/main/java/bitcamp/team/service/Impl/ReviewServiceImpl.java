package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
  public Map<String, Object> get(int no) {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", reviewDao.findByNo(no));
    return content;
  }
}
