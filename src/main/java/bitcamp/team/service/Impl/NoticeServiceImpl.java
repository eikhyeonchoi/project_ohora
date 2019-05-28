package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.NoticeDao;
import bitcamp.team.dao.NoticeFileDao;
import bitcamp.team.domain.Notice;
import bitcamp.team.domain.NoticeFile;
import bitcamp.team.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {

  NoticeDao noticeDao;
  NoticeFileDao noticeFileDao;

  public NoticeServiceImpl(NoticeDao noticeDao, NoticeFileDao noticeFileDao) {
    this.noticeDao = noticeDao;
    this.noticeFileDao = noticeFileDao;
  }

  @Override
  public List<Notice> list(String keyword, String searchType) {
    HashMap<String, Object> params = new HashMap<>();
    params.put("searchType", searchType);
    params.put("keyword", keyword);

    return noticeDao.findAll(params);
  }

  @Override
  public int add(Notice notice) {
    int count = noticeDao.insert(notice);

    if (notice.getNoticeFile() != null) {
      List<NoticeFile> noticeFiles = notice.getNoticeFile();
      for (NoticeFile file : noticeFiles) {
        file.setNoticeNo(notice.getNo());
      }
      noticeFileDao.insert(noticeFiles);
    }
    return count;
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
    if (notice.getNoticeFile() != null) {
      noticeFileDao.insert(notice.getNoticeFile());
    }
    return noticeDao.update(notice);
  }

  @Override
  public int delete(int no) {

    List<NoticeFile> noticeFiles = noticeFileDao.findByNoticeNo(no);
    for (NoticeFile file : noticeFiles) {
      noticeFileDao.deleteByNo(file.getNoticeNo());
    }
    int count = noticeDao.delete(no);
    return count;
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

  @Override
  public int upload(List<NoticeFile> files) {
    return noticeDao.uploadFile(files);
  }

  @Override
  public Notice getFile(int no) {
    return noticeDao.findFileByNo(no);
  }

  public int fileDelete(int no) {
    return noticeFileDao.deleteByNo(no);
  }
}
