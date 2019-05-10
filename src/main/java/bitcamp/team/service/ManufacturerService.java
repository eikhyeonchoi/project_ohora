package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Manufacturer;

public interface ManufacturerService {
  List<Manufacturer> list(String keyword);
  int add(Manufacturer member);
  Manufacturer get(int no);
  int update(Manufacturer member);
  int delete(int no);
  int size();
}
