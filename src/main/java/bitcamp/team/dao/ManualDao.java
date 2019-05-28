package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manual;

public interface ManualDao {
  int insert(Manual manual);
  List<Manual> findAll(Map<String,Object> map);
  List<Manual> findAllByProduct(Map<String,Object> map);
  List<Manual> findAllByManualFile(Map<String,Object> map);
}
