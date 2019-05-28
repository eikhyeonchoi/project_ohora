package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.QuestionFile;

public interface QuestionFileDao {
  int insert(List<QuestionFile> questionFiles);
  int deleteByQnsNo(int no);
}
