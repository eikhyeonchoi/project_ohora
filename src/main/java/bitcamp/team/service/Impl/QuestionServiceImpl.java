package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.AnswerDao;
import bitcamp.team.dao.AnswerFileDao;
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
  AnswerDao answerDao;
  AnswerFileDao answerFileDao;

  public QuestionServiceImpl(
      QuestionDao questionDao,
      QuestionFileDao questionFileDao,
      AnswerDao answerDao,
      AnswerFileDao answerFileDao) {
    this.questionDao = questionDao;
    this.questionFileDao = questionFileDao;
    this.answerDao = answerDao;
    this.answerFileDao = answerFileDao;
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
  public List<Question> typeList(int no, boolean check) {
    if (check)
      return questionDao.findByTypeCheck(no);
    else 
      return questionDao.findByType(no);
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

  @Override
  public int delete(int no, String status) {
    if (status.equals("답변 완료")) {
      int ansNo = answerDao.findAnsNoByQno(no);
      answerFileDao.deleteByAnswerNo(ansNo);
      answerDao.deleteByQnsNo(no);
    } 
    questionFileDao.deleteByQnsNo(no);
    return questionDao.delete(no);
  }

}