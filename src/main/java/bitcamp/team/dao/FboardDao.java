// Proxy 패턴 적용 : BoardDAO에서 인터페이스를 추출한다.
package bitcamp.team.dao;

import java.util.HashMap;
import java.util.List;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;

public interface FboardDao {

   List<Fboard> findAll(HashMap<String, Object> param);
   List<Fboard> findByMemberNo(int memberNo);
   Fboard findByNo(int no);
   int increaseCount(int no);
   int delete(int no);
   int insert(Fboard fBoard);
   int update(Fboard fBoard);
   int countAll();
   
   // 여기서부터 댓글 dao
   // 여기서부터 댓글 dao
   List<FboardComment> findCommentAll(int no);
   int insertComment(FboardComment fboardComment);
   int deleteComment(int no);
   int updateComment(HashMap<String, Object> param);
   List<FboardComment> findReply(HashMap<String, Object> paramMap);
   
   // 전체삭제
   int deleteCommentFboard(int no);
} 
