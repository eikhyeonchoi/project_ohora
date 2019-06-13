package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.AnswerDao;
import bitcamp.team.dao.AnswerFileDao;
import bitcamp.team.dao.QuestionDao;
import bitcamp.team.domain.Answer;
import bitcamp.team.domain.AnswerFile;
import bitcamp.team.service.AnswerService;
   
@Service
public class AnswerServiceImpl implements AnswerService {

  AnswerDao answerDao;
  AnswerFileDao answerFileDao;
  QuestionDao questionDao;

  public AnswerServiceImpl(
      AnswerDao answerDao,
      AnswerFileDao answerFileDao,
      QuestionDao questionDao) {

    this.answerDao = answerDao;
    this.answerFileDao = answerFileDao;
    this.questionDao = questionDao;
  }

  @Override
  public int add(Answer answer) {
    int count = answerDao.insert(answer);
    questionDao.status(answer.getQuestionNo());
    if (answer.getAnswerFiles() != null) {
      List<AnswerFile> answerFiles = answer.getAnswerFiles();
      for (AnswerFile files : answerFiles) {
        files.setAnswerNo(answer.getNo());
      } // for

      answerFileDao.insert(answer.getAnswerFiles());
    } // if
    return count;
  }

  @Override
  public Answer getFile(int no) {
    return answerDao.findFileByNo(no);
  }

  @Override
  public int update(Answer answer) {
    if (answer.getContent() != null) {
      answerDao.update(answer);
    }
    List<AnswerFile> answerFiles = answer.getAnswerFiles();
    answerFileDao.deleteByAnswerNo(answer.getNo());
    if (answerFiles != null) {
      for (AnswerFile files : answerFiles) {
        files.setAnswerNo(answer.getNo());
      } // for
      answerFileDao.insert(answer.getAnswerFiles());
    } 

    return 1;
  }

}