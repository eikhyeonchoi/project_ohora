package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManufacturerDao;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.service.ManufacturerService;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

  ManufacturerDao manufacturerDao;

  public ManufacturerServiceImpl(ManufacturerDao manufacturerDao) {
    this.manufacturerDao = manufacturerDao;
  }

  @Override
  public List<Manufacturer> list() {
    return manufacturerDao.findAll();
  }

  @Override
  public List<Manufacturer> list(String keyword) {
    System.out.println("==>" + keyword);
    if (keyword == null) {
      System.out.println("keyword ==> " + keyword);
      return manufacturerDao.findByKeyword(null);
    } else {
      System.out.println("else + keyword ==> " + keyword);
      return manufacturerDao.findByKeyword(keyword);
    }

  }

  @Override
  public int add(Manufacturer manufacturer) {
    return manufacturerDao.insert(manufacturer);
  }

  @Override
  public Manufacturer get(int no) {
    return manufacturerDao.findByNo(no);
  }

  @Override
  public int update(Manufacturer manufacturer) {
    return manufacturerDao.update(manufacturer);
  }

  @Override
  public int delete(int no) {
    return manufacturerDao.delete(no);
  }
  @Override
  public int size() {
    return manufacturerDao.countAll();
  }
}