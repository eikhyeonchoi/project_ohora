package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.TipHistoryDao;
import bitcamp.team.domain.TipHistory;
import bitcamp.team.service.TipHistoryService;

@Service
public class TipHistoryServiceImpl implements TipHistoryService {

  TipHistoryDao tipDao;

  public TipHistoryServiceImpl(TipHistoryDao tipDao) {
    this.tipDao = tipDao;
  }
  
  @Override
  public int add(TipHistory tip) {
    return tipDao.insert(tip);
  }

  @Override
  public int update(TipHistory tip) {
    return tipDao.update(tip);
  }

  @Override
  public List<TipHistory> get(int no) {
    return tipDao.findByNo(no);
  }
  @Override
  public int delete(int no) {
    return tipDao.delete(no);
  }

  @Override
  public TipHistory detail(int no) {
    return tipDao.findContsByNo(no);
  }
}
