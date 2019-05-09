package bitcamp.team.third.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.third.domain.Notice;

public interface NoticeDao {
  List<Notice> findAll(Map<String, Object> param);

  int countAll();
}
