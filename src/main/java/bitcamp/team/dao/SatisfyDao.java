package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Satisfy;

public interface SatisfyDao {
  List<Satisfy> findAll();
  List<Satisfy> findByNo(int no);
  int countAll(int no);
}
