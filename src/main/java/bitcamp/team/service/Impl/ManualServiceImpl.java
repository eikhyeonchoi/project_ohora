package bitcamp.team.service.Impl;

import java.util.HashMap;
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

  @Override
  public List<Manual> list(String keyword, String searchType) {
    HashMap<String,Object> contents = new HashMap<>();
    switch(searchType) {
      case "product": contents.put("product", searchType); break;
      case "all": contents.put("all", searchType); break;
      default: break;
    }
    if (keyword != null) {
      if (!keyword.equals("")) {
        contents.put("keyword", keyword);
      }
    }
    return manualDao.findAll(contents);
  }
}
