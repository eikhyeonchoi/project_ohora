package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.domain.Board;

@Service
public interface BoardService {
  int add(Board board);
  
  int update(Board board);
  
  int size(Map<String, Object> paramMap);
  
  List<Board> list();
  
  Board get(int no);

}
