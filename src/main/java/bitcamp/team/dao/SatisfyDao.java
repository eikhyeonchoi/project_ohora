package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Satisfy;

public interface SatisfyDao {
  List<Satisfy> findAll();
  List<Satisfy> findByNo(int no);
  int countAll(int no);
  int insert(Satisfy satisfy);
  Satisfy findByMemberNo(Map<String, Object> param);
  
  int deleteByProductNo(int no);
}
