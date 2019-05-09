package bitcamp.team.second.service;

import java.util.Map;
import bitcamp.team.second.domain.Faq;

public interface FaqService {
  Map<String, Object> list();
  Faq get(int no);
  int add(Faq faq);
  int delete(int no);
  int update(Faq faq);
}
