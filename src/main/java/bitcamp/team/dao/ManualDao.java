package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manual;

public interface ManualDao {
  int insert(Manual manual);
  int deleteByProductNo(int no);
  int increaseCount(int no);
  Manual findFileByNo(int no);
  List<Manual> findByNo(int no);
  List<Manual> findAll(Map<String,Object> map);
}
