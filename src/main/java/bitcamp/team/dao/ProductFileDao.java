package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.ProductFile;

public interface ProductFileDao {
  List<ProductFile> findByProductNo(int no);
  int insert(List<ProductFile> productFiles);
  int deleteByProductNo(int no);
}
