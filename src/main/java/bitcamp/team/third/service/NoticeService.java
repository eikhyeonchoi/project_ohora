package bitcamp.team.third.service;

import java.util.List;
import bitcamp.team.third.domain.Notice;

public interface NoticeService {
  List<Notice> list(int pageNo, int pageSize);

  int add(Notice notice);

  Notice get(int no);

  int update(Notice notice);

  int delete(int no);

  int size();
}
