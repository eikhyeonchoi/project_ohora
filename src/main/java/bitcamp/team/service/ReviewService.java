package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Review;

public interface ReviewService {
  List<Review> list();
  List<Review> get(int no, int pageNo, int pageSize, String keyword, String searchType);
  Review get2(int no);
  int add(Review review);
  int delete(int no);
  int update(Review review);
  int size(int no, String keyword, String searchType);
}
