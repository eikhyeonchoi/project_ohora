package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Review;

public interface ReviewDao {
  List<Review> findAll();
  List<Review> findByNo(Map<String, Object> param);
  Review findByNo2(int no);
  
  int increaseCount(int no);
  int delete(int no);
  int update(Review review);
  
  int countAll(Map<String, Object> param);
  int countPage(int no);
}
