package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Notice;

public interface NoticeDao {
  int insert(Notice notice);

  List<Notice> findAll(Map<String, Object> param);

  Notice findByNo(int no);

  int increaseCount(int no);

  int update(Notice notice);

  int delete(int no);

  int countAll();
}
