package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Review;

public interface ReviewDao {
  List<Review> findAll();
}
