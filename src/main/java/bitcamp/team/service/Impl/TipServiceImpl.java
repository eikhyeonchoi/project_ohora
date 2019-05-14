package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.TipDao;
import bitcamp.team.domain.Tip;
import bitcamp.team.service.TipService;

@Service
public class TipServiceImpl implements TipService{

  TipDao tipDao;

  public TipServiceImpl(TipDao tipDao) {
    this.tipDao = tipDao;
  }

  @Override
  public int add(Tip tip) {
    return tipDao.insert(tip);
  }

  @Override
  public int update(Tip tip) {
    return tipDao.update(tip);
  }

  @Override
  public List<Tip> list() {
    return tipDao.findAll();
  }
  @Override
  public int delete(int no) {
    return tipDao.delete(no);
  }
  @Override
  public Tip get(int no) {
    return tipDao.findByNo(no);
  }
  
}
