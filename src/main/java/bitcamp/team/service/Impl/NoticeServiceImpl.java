package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.NoticeDao;
import bitcamp.team.domain.Notice;
import bitcamp.team.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {

  NoticeDao noticeDao;

  public NoticeServiceImpl(NoticeDao noticeDao) {
    this.noticeDao = noticeDao;
  }

  @Override
  public List<Notice> list(int pageNo, int pageSize, String keyword, String searchType) {
    HashMap<String, Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    params.put("searchType", searchType);
    params.put("keyword", keyword);

    return noticeDao.findAll(params);
  }

  @Override
  public int add(Notice notice) {
    return noticeDao.insert(notice);
  }

  @Override
  public Notice get(int no) {
    Notice notice = noticeDao.findByNo(no);
    if (notice != null) {
      noticeDao.increaseCount(no);
    }
    return notice;
  }

  @Override
  public int update(Notice notice) {
    return noticeDao.update(notice);
  }

  @Override
  public int delete(int no) {
    return noticeDao.delete(no);
  }

  @Override
  public int size(String keyword) {
    if (keyword != null) {
      HashMap<String, Object> params = new HashMap<>();
      params.put("keyword", keyword);

      return noticeDao.countAll(params);
    }
    return noticeDao.countAll(null);
  }


}