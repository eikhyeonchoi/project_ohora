package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.NoticeFile;

public interface NoticeFileDao {
  int insert(List<NoticeFile> files);

  List<NoticeFile> findByNo(int noticeNo);

  int deleteByNo(int noticeNo);
}
