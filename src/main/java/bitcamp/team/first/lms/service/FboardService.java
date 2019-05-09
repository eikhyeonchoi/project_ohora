package bitcamp.team.first.lms.service;

import java.util.List;
import bitcamp.team.first.lms.domain.Fboard;

public interface FboardService {
  List<Fboard> list();
  int add(Fboard board);
  Fboard get(int no);
  int update(Fboard board);
  int delete(int no);
  int size();
}
