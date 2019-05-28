package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.QuestionType;

public interface QuestionDao {
  int insert(Question question);
  List<Question> findAll();
  List<Question> findAllByMember(int no);
  List<Question> findByType(int no);
  List<Question> findByTypeCheck(int no);
  List<QuestionType> findType();
  Question findByNo(int no);
  Question findFileByNo(int no);
  int status(int no);
  int delete(int no);
}
