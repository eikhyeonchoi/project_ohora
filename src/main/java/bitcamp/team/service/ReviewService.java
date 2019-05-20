package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Review;

public interface ReviewService {
  List<Review> list();
  List<Review> get(int no);
  Review get2(int no);
  int delete(int no);
  int update(Review review);
}
