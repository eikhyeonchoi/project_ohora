package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.QuestionType;

public interface QuestionService {
  int add(Question question);

  List<Question> list(int no);
  List<QuestionType> listQuestionType();
  Question get(int no);
  Question getFile(int no);
  int delete(int no, String status);
}
