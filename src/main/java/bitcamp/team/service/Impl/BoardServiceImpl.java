package bitcamp.team.service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.BoardDao;
import bitcamp.team.domain.Board;
import bitcamp.team.domain.BoardReply;
import bitcamp.team.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {

  BoardDao boardDao;

  public BoardServiceImpl(BoardDao boardDao) {
    this.boardDao = boardDao;
  }

  @Override
  public int add(Board board) {
    return boardDao.insert(board);
  }

  @Override
  public int update(Board board) {
    return boardDao.update(board);
  }

  @Override
  public int size(Map<String, Object> paramMap) {
    return boardDao.countAll(paramMap);
  }

  @Override
  public List<Board> list() {
    return boardDao.findAll();
  }

  @Override
  public List<BoardReply> replyList(int no) {
    // 한 게시물에 종속되는 모든 댓글 가져오기
    List<BoardReply> replyList = boardDao.findReplyAll(no);

    List<BoardReply> parent = new ArrayList<BoardReply>();
    List<BoardReply> child = new ArrayList<BoardReply>();
    List<BoardReply> returnList = new ArrayList<BoardReply>();

    for (BoardReply b : replyList) {
      if (b.getDepth() == 0)
        parent.add(b);
      else
        child.add(b);
    }

    for (BoardReply parentBoard : parent) {
      returnList.add(parentBoard);
      for (BoardReply childBoard : child) {
        if (parentBoard.getNo() == childBoard.getParentId()) {
          returnList.add(childBoard);
        }
      }
    }
    return returnList;
  }


  @Override
  public Board get(int no) {
    return boardDao.detail(no);
  }

  @Override
  public int delete(int no) {
    List<BoardReply> replyList = boardDao.findReplyAll(no);
    for (BoardReply b : replyList) {
      boardDao.deleteReply(b.getNo());
    }
    return boardDao.delete(no);
  }

  @Override
  public int insertReply(BoardReply boardReply) {
    return boardDao.insertReply(boardReply);
  }

  @Override
  public int deleteReply(int no) {
    return boardDao.deleteReply(no);
  }

  @Override
  public int updateReply(BoardReply boardReply) {
    return boardDao.updateReply(boardReply);
  }

  @Override
  public BoardReply getReply(int no) {
    return boardDao.getReply(no);
  }

}
