package bitcamp.team.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.domain.Board;
import bitcamp.team.domain.BoardReply;

@Service
public interface BoardService {
  int add(Board board);
  
  int update(Board board);
  
  int size(Map<String, Object> paramMap);
  
  List<Board> list();
  List<BoardReply> replyList(int no);
  
  Board get(int no);
  
  int delete(int no);
  
  int insertReply(BoardReply boardReply);

}
