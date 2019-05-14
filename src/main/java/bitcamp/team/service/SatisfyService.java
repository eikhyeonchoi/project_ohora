package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Satisfy;

public interface SatisfyService {
  List<Satisfy> list();
  Map<String, Object> get(int no);
  int add(Satisfy satisfy);
}
