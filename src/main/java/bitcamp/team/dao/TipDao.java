package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Tip;

public interface TipDao {
   List<Tip> findAll(Map<String,Object> map);
   List<Tip> findByKeyword(String keyword);
   Tip findByNo(int no);
   Tip findByTipNo(int no);
   int delete(int no);
   int insert(Tip tip);
   int update(Tip tip);
   int updateTip(Tip tip);
   int confirmTip(int no);
   int findNoByProductNo(int no);
   int deleteByProductNo(int no);
}
