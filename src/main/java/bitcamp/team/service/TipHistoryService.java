package bitcamp.team.service;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.domain.TipHistory;

@Service
public interface TipHistoryService {
  int add(TipHistory tip);
  int update(TipHistory tip);
  List<TipHistory> get(int no);
  TipHistory detail(int no);
  int delete(int no);
  int count();
}
