package bitcamp.team.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import bitcamp.team.domain.FboardComment;
import bitcamp.team.domain.Review;
import bitcamp.team.domain.ReviewComment;

public interface ReviewDao {
  List<Review> findProd(String keyword);

  List<Review> findByNo(Map<String, Object> param);

  Review findByNo2(int no);
  
  List<Review> findMyPageReview(int no);

  int increaseCount(int no);

  int delete(int no);

  int update(Review review);

  int insert(Review review);

  int deleteByProductNo(int no);

  int countByProdNo(int no);
  
  //댓글
  List<ReviewComment> findCommentAll(int no);
  int insertComment(ReviewComment reviewComment);
  int deleteComment(int no);
  int updateComment(HashMap<String, Object> param);
  List<ReviewComment> findReply(HashMap<String, Object> paramMap);
}
