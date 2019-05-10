package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Board;
import bitcamp.team.domain.BoardReply;

public interface BoardDao {
  // insert
  int insert(Board board);
  
  // update
  int update(Board board);
  
  // 갯수
  int countAll(Map<String, Object> paramMap);
  
  // list
  List<Board> findAll();
  
  // view == detail 
  Board detail(int no);
  
  List<BoardReply> findReply(int no);
}
