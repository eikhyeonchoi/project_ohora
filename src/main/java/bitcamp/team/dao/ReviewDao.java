package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Faq;
import bitcamp.team.domain.Review;

public interface ReviewDao {
  List<Review> findAll();
  List<Review> findByNo(int no);
  Review findByNo2(int no);
}
