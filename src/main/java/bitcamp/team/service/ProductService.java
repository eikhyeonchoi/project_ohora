package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;

public interface ProductService {
  List<Product> list(Map<String, Object> param);
  List<Manufacturer> listManufacturer();
  Map<String, Object> findCategory();
  int add(Product product);
  int get(String name);
  
}
