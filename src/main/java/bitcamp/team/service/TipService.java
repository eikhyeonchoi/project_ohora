package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.domain.Tip;

@Service
public interface TipService {
  int add(Tip tip);
  int update(Tip tip);
  int getNo(int no);
  int delete(int no);
  int confirm(int no);
  Tip get(int no);
  List<Tip> list();
  List<Tip> search(Map<String,Object> map);
}
