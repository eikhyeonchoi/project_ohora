package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.ManualFile;

public interface ManualFileDao {
  List<ManualFile> findByTypeNo(int no);
  int insert(List<ManualFile> manualFiles);
}
