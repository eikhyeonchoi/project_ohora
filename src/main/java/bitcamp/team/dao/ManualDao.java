package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualComment;

public interface ManualDao {
  List<Manual> findByNo(int no);
  List<Manual> findAll(Map<String,Object> map);
  List<ManualComment> findCommentAll(int no);
  List<ManualComment> findReply(Map<String,Object> param);
  Manual findFileByNo(int no);
  Manual confirmManual(int no);
  int insert(Manual manual);
  int deleteByProductNo(int no);
  int increaseCount(int no);
  int delete(int no);
  int insertComment(ManualComment manualComment);
  int updateComment(Map<String,Object> param);
  int deleteComment(int no);
  int deleteCommentManual(int no);
}
