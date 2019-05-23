package bitcamp.team.service.Impl;

import java.util.HashMap;
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
  public List<Tip> list(int pageNo, int pageSize, String keyword, String searchType) {

    HashMap<String,Object> contents = new HashMap<>();
    if (searchType != null) {
      switch (searchType) {
        case "prodName": contents.put("prodName", searchType); break;
        case "memName": contents.put("memName", searchType); break;
        case "cont": contents.put("cont", searchType); break;
        case "prodConts": contents.put("prodConts", searchType); break;
        default: ;
      }
    }
    if (keyword != null) {
      contents.put("keyword", keyword);
    }
    contents.put("size", pageSize);
    contents.put("rowNo", (pageNo - 1) * pageSize);
    return tipDao.findAll(contents);
  }
  @Override
  public int delete(int no) {
    return tipDao.delete(no);
  }
  @Override
  public Tip get(int no) {
    return tipDao.findByNo(no);
  }

  @Override
  public int confirm(int no) {
    return tipDao.confirmTip(no);
  }

  @Override
  public int getNo(int no) {
    return tipDao.findNoByProductNo(no);
  }

  @Override
  public int size(String keyword) {
    if (keyword != null) {
      return tipDao.countAll(keyword);
    }
    return tipDao.countAll(null);
  }
}
