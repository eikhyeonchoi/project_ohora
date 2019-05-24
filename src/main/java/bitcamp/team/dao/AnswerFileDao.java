package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.AnswerFile;

public interface AnswerFileDao {
  int insert(List<AnswerFile> answerFiles);
}
