package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.AnswerDao;
import bitcamp.team.dao.AnswerFileDao;
import bitcamp.team.domain.Answer;
import bitcamp.team.domain.AnswerFile;
import bitcamp.team.service.AnswerService;

@Service
public class AnswerServiceImpl implements AnswerService {

  AnswerDao answerDao;
  AnswerFileDao answerFileDao;

  public AnswerServiceImpl(
      AnswerDao answerDao,
      AnswerFileDao answerFileDao) {

    this.answerDao = answerDao;
    this.answerFileDao = answerFileDao;
  }

  @Override
  public int add(Answer answer) {
    int count = answerDao.insert(answer);
    if (answer.getAnswerFiles() != null) {
      List<AnswerFile> answerFiles = answer.getAnswerFiles();
      for (AnswerFile files : answerFiles) {
        files.setAnswerNo(answer.getNo());
      } // for
      answerFileDao.insert(answerFiles);
    } // if
    return count;
  }

}