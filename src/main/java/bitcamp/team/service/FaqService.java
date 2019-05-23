package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Faq;

public interface FaqService {
  Map<String, Object> list();
  List<Faq> categoryList(int no);
  Faq get(int no);
  int add(Faq faq);
  int delete(int no);
  int update(Faq faq);
}
