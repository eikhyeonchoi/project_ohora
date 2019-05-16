package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.ProductLargeCategory;
import bitcamp.team.domain.ProductSmallCategory;

public interface ProductDao {
  List<Product> findAll(Map<String, Object> param);
  List<ProductLargeCategory> findLargeCategory();
  List<ProductSmallCategory> findSmallCategory();
  List<Product> findManufacturer();
  int insert(Product product);
  Product findNoByName(String name);
  Product findByNo(int no);
}
