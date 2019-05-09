// Proxy 패턴 적용 : BoardDAO에서 인터페이스를 추출한다.
package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Fboard;

public interface FboardDao {

   List<Fboard> findAll();
   Fboard findByNo(int no);
   int increaseCount(int no);
   int delete(int no);
   int insert(Fboard fBoard);
   int update(Fboard fBoard);
   int countAll();
}
