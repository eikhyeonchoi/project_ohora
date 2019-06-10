package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManualDao;
import bitcamp.team.dao.ManualFileDao;
import bitcamp.team.dao.ProductDao;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.domain.Product;
import bitcamp.team.service.ManualService;

@Service
public class ManualServiceImpl implements ManualService {

  ManualDao manualDao;
  ManualFileDao manualFileDao;
  ProductDao productDao;
  
  public ManualServiceImpl(
      ManualDao manualDao,
      ManualFileDao manualFileDao,
      ProductDao productDao) {
    this.manualDao = manualDao;
    this.manualFileDao = manualFileDao;
    this.productDao = productDao;
  }
  
  @Override
  public int add(Manual manual) {
    int count = manualDao.insert(manual);
    List<ManualFile> manualFiles = manual.getManualFile();
    for (ManualFile file : manualFiles) {
      file.setManualNo(manual.getNo());
    }
    manualFileDao.insert(manualFiles);
    return count;
  }

  @Override
  public List<ManualFile> typeFileList(int no) {
    return manualFileDao.findByTypeNo(no);
  }

  @Override
  public List<Manual> list(String keyword, String searchType) {
    HashMap<String,Object> contents = new HashMap<>();
    System.out.println("keyword => " + keyword);
    System.out.println("searchType => " + searchType);
    if (searchType != null) {
      switch (searchType) {
        case "prodName": contents.put("prodName", searchType);
        case "manufacturer": contents.put("manufacturer", searchType);
        default: ;
      }
    }
    if (keyword != null) {
      if (!keyword.equals(""))
        contents.put("keyword", keyword);
    }
    System.out.println("keyword => " + keyword);
    System.out.println("searchType => " + searchType);
    return manualDao.findAll(contents);
  }

  @Override
  public Manual getFile(int no) {
    return manualDao.findFileByNo(no);
  }

  @Override
  public List<Manual> get(int no) {
    return manualDao.findByNo(no);
  }

  @Override
  public List<Product> getAllProduct() {
    return productDao.findAllUseManual();
  }
  
  
  
}
