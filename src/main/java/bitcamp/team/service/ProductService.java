package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Product;

public interface ProductService {
  List<Product> list(Map<String, Object> param);
  Map<String, Object> findCategory();
  int get(String name);
}
