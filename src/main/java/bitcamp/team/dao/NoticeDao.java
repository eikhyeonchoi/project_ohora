package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Notice;

public interface NoticeDao {
  List<Notice> findAll(Map<String, Object> param);

  int countAll();
}
