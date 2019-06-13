package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Review;

public interface ReviewService {
  List<Review> list(String keyword);

  List<Review> get(int no, String keyword, String searchType);

  Review get2(int no);
  
  List<Review> findMyPageReview(int no);

  int add(Review review);

  int delete(int no);

  int update(Review review);

  int countByProdNo(int no);
}
