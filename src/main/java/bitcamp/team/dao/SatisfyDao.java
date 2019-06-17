package bitcamp.team.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Satisfy;

public interface SatisfyDao {
  List<Satisfy> findAll(HashMap<String, Object> params);
  List<Satisfy> findByNo(int no);
  int countAll(int no);
  int insert(Satisfy satisfy);
  int update(Satisfy satisfy);
  int delete(int no);
  Satisfy findByMemberNo(Map<String, Object> param);
  
  int deleteByProductNo(int no);
}
