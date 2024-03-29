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

  // 댓글
  List<BoardReply> findReplyAll(int no);

  // view == detail
  Board detail(int no);

  int delete(int no);

  int insertReply(BoardReply boardReply);

  // 댓글 하나만 가져오기
  BoardReply getReply(int no);

  // 댓글 삭제
  int deleteReply(int no);

  // 댓글 업데이트
  int updateReply(BoardReply boardReply);
}
