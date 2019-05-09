package bitcamp.team.service;

import java.util.Map;
import bitcamp.team.domain.Faq;

public interface FaqService {
  Map<String, Object> list();
  Faq get(int no);
  int add(Faq faq);
  int delete(int no);
  int update(Faq faq);
}
