package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.QuestionDao;
import bitcamp.team.domain.Question;
import bitcamp.team.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

  QuestionDao questionDao;

  public QuestionServiceImpl(QuestionDao questionDao) {
    this.questionDao = questionDao;
  }

  @Override
  public List<Question> list() {
    return questionDao.findAll();
  }

}