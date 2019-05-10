package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Manufacturer;

public interface ManufacturerDao {
  int insert(Manufacturer member);
  List<Manufacturer> findAll();
  List<Manufacturer> findByKeyword(String keyword);
  Manufacturer findByNo(int no);
  int update(Manufacturer member);
  int delete(int no);
  int countAll();
}
