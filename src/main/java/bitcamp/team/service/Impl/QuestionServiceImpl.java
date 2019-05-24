package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.QuestionDao;
import bitcamp.team.dao.QuestionFileDao;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.QuestionFile;
import bitcamp.team.domain.QuestionType;
import bitcamp.team.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

  QuestionDao questionDao;
  QuestionFileDao questionFileDao;

  public QuestionServiceImpl(
      QuestionDao questionDao,
      QuestionFileDao questionFileDao) {
    this.questionDao = questionDao;
    this.questionFileDao = questionFileDao;
  }

  @Override
  public List<Question> list(int no) {
    if (no == 1 || no == 2) {
      return questionDao.findAllByMember(no);
    } else {
      return questionDao.findAll();
    }
  }

  @Override
  public Question get(int no) {
    return questionDao.findByNo(no);
  }

  @Override
  public List<QuestionType> listQuestionType() {
    return questionDao.findType();
  }

  @Override
  public int add(Question question) {
    int count = questionDao.insert(question);
    if (question.getQuestionFiles() != null) {
      List<QuestionFile> questionFiles = question.getQuestionFiles();
      for (QuestionFile files : questionFiles) {
        files.setQuestionNo(question.getNo());
      } // for
      questionFileDao.insert(questionFiles);
    } // if
    return count;
  }

  @Override
  public Question getFile(int no) {
    return questionDao.findFileByNo(no);
  }

}