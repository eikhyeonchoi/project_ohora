package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.FboardFile;

public interface FboardFileDao {

  int insert(List<FboardFile> fboardFiles);
  int deleteByFboardNo(int no);
}
