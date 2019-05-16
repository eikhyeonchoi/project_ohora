// Proxy 패턴 적용 : BoardDAO에서 인터페이스를 추출한다.
package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;

public interface FboardDao {

   List<Fboard> findAll();
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
   
}
