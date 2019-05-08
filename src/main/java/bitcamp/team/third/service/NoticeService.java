package bitcamp.team.third.service;

import java.util.List;
import bitcamp.team.third.domain.Notice;

public interface NoticeService {
  List<Notice> list(int pageNo, int pageSize);

  int size();
}
