package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Notice;

public interface NoticeService {
  List<Notice> list(int pageNo, int pageSize, String keyword, String searchType);

  int add(Notice notice);

  Notice get(int no);

  int update(Notice notice);

  int delete(int no);

  int size(String keyword);
}
