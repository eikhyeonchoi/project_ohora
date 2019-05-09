package bitcamp.team.third.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.third.dao.NoticeDao;
import bitcamp.team.third.domain.Notice;
import bitcamp.team.third.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {

  NoticeDao noticeDao;

  public NoticeServiceImpl(NoticeDao noticeDao) {
    this.noticeDao = noticeDao;
  }

  @Override
  public List<Notice> list(int pageNo, int pageSize) {
    HashMap<String, Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);

    return noticeDao.findAll(params);
  }

  @Override
  public int size() {
    // 전체 게시물의 개수
    return noticeDao.countAll();
  }
}
