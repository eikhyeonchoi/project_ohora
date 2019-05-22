package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;

public interface ProductService {
  List<Product> list(Map<String, Object> param);
  List<Manufacturer> listManufacturer();
  List<Product> getList(String name);
  Map<String, Object> findCategory();
  int add(Product product);
  int getNo(String name);
  int update(Product product);
  String get(int no);
  Product getFile(int no);
}
