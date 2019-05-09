package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Notice;

public interface NoticeService {
  List<Notice> list(int pageNo, int pageSize);

  int size();
}
