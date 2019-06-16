package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.QuestionType;

public interface QuestionService {
  int add(Question question);

  List<Question> list(int type, int no);
  List<Question> typeList(int no ,boolean check);
  List<QuestionType> listQuestionType();
  Question get(int no);
  Question getFile(int no);
  int delete(int no, String status);
  int delete2(List<Question> qNo);
  List<Question> findQno(int memberNo);


}
