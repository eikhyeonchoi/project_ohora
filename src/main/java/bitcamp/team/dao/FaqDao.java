package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Faq;

public interface FaqDao {
  List<Faq> findAll();
  List<Faq> findCategoryName();
  Faq findByNo(int no);
  int insert(Faq faq);
  int delete(int no);
  int update(Faq faq);
}
