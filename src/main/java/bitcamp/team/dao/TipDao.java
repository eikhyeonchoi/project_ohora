// Proxy 패턴 적용 : BoardDAO에서 인터페이스를 추출한다.
package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Tip;

public interface TipDao {
   List<Tip> findAll(Map<String,Object> map);
   List<Tip> findByKeyword(String keyword);
   Tip findByNo(int no);
   int delete(int no);
   int insert(Tip tip);
   int update(Tip tip);
   int confirmTip(int no);
   int findNoByProductNo(int no);
}
