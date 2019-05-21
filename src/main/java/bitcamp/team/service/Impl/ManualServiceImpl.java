package bitcamp.team.service.Impl;

import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManualDao;
import bitcamp.team.domain.Manual;
import bitcamp.team.service.ManualService;

@Service
public class ManualServiceImpl implements ManualService {

  ManualDao manualDao;
  
  public ManualServiceImpl(ManualDao manualDao) {
    this.manualDao = manualDao;
  }
  
  @Override
  public int add(Manual manual) {
    return manualDao.insert(manual);
  }

}
