package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManufacturerDao;
import bitcamp.team.dao.ProductDao;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;
import bitcamp.team.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
 
  ProductDao productDao;
  ManufacturerDao manufacturerDao;
  
  public ProductServiceImpl(
      ProductDao productDao, 
      ManufacturerDao manufacturerDao) {
    this.productDao = productDao;
    this.manufacturerDao = manufacturerDao;
  }

  @Override
  public List<Product> list(Map<String, Object> param) {
    return productDao.findAll(param);
  }

  @Override
  public Map<String, Object> findCategory() {
    HashMap<String, Object> ctgList = new HashMap<>();
    ctgList.put("largeList", productDao.findLargeCategory());
    ctgList.put("smallList", productDao.findSmallCategory());
    return ctgList;
  }

  @Override
  public List<Manufacturer> listManufacturer() {
    return manufacturerDao.findAllUseProductAdd();
    
  }

  @Override
  public int add(Product product) {
    return productDao.insert(product);
  }
  

}










