package bitcamp.team.dao;

import bitcamp.team.domain.Answer;

public interface AnswerDao {
  int insert(Answer answer);
  Answer findFileByNo(int no);
  int update(Answer answer);
  int findAnsNoByQno(int no);
  int deleteByQnsNo(int no);
}
