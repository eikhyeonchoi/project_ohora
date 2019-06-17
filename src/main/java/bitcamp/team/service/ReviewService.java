package bitcamp.team.service;

import java.util.HashMap;
import java.util.List;
import bitcamp.team.domain.Review;
import bitcamp.team.domain.ReviewComment;

public interface ReviewService {
  List<Review> list(String keyword);

  List<Review> get(int no, String keyword, String searchType);

  Review get2(int no);

  List<Review> findMyPageReview(int no);

  int add(Review review);

  int delete(int no);

  int update(Review review);

  int countByProdNo(int no);

  // 댓글
  HashMap<String, Object> commentList(int no);

  int addComment(ReviewComment reviewComment);

  int deleteComment(int no);

  int updateComment(HashMap<String, Object> param);

  List<ReviewComment> findReply(HashMap<String, Object> param);
}
