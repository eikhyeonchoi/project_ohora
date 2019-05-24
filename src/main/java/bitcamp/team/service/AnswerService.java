package bitcamp.team.service;

import bitcamp.team.domain.Answer;

public interface AnswerService {
  int add(Answer answer);
  Answer getFile(int no);

}
