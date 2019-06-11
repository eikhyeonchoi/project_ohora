package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.SatisfyDao;
import bitcamp.team.domain.Satisfy;
import bitcamp.team.service.SatisfyService;

@Service
public class SatisfyServiceImpl implements SatisfyService {
  
  SatisfyDao satisfyDao;
  
  public SatisfyServiceImpl(SatisfyDao satisfyDao) {
    this.satisfyDao = satisfyDao;
  }
  
  @Override
  public List<Satisfy> list() {
    return satisfyDao.findAll();
  }
  
  @Override
  public Map<String, Object> get(int no) {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", satisfyDao.findByNo(no));
    content.put("totalColumn", satisfyDao.countAll(no));
    return content;
  }
  
  @Override
  public int add(Satisfy satisfy) {
    return satisfyDao.insert(satisfy);
  }

  @Override
  public Satisfy getReviewedMember(Map<String, Object> param) {
    return satisfyDao.findByMemberNo(param);
  }
}
