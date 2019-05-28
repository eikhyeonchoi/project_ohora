package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManualDao;
import bitcamp.team.dao.ManualFileDao;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.service.ManualService;

@Service
public class ManualServiceImpl implements ManualService {

  ManualDao manualDao;
  ManualFileDao manualFileDao;
  
  public ManualServiceImpl(
      ManualDao manualDao,
      ManualFileDao manualFileDao) {
    this.manualDao = manualDao;
    this.manualFileDao = manualFileDao;
  }
  
  @Override
  public int add(Manual manual) {
    manualDao.insert(manual);
    return manualFileDao.insert(manual.getManualFile());
  }

  @Override
  public List<ManualFile> typeFileList(int no) {
    return manualFileDao.findByTypeNo(no);
  }
  
  
}
