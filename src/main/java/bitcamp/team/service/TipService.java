package bitcamp.team.service;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.domain.Tip;

@Service
public interface TipService {
  int add(Tip tip);
  int update(Tip tip);
  List<Tip> list();
  Tip get(int no);
  int getNo(int no);
  int delete(int no);
  int confirm(int no);
}
