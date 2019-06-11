package bitcamp.team.service;

import java.util.HashMap;
import java.util.List;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;

public interface FboardService {
  List<Fboard> list(HashMap<String, Object> param);
  List<Fboard> findMyPost(int memberNo);
  int add(Fboard board);
  Fboard get(int no);
  int update(Fboard board);
  int delete(int no);
  int size();
  
  // 댓글
  HashMap<String, Object> commentList(int no);
  int addComment(FboardComment fboardComment);
  int deleteComment(int no);
  int updateComment(HashMap<String, Object> param);
  List<FboardComment> findReply(HashMap<String, Object> param);
  
}
