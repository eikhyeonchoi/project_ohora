package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Question;

public interface QuestionDao {

  List<Question> findAll();
}
