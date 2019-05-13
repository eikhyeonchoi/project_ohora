package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ProductDao;
import bitcamp.team.domain.Product;
import bitcamp.team.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
 
  ProductDao productDao;
  
  public ProductServiceImpl(ProductDao productDao) {
    this.productDao = productDao;
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
  

}










