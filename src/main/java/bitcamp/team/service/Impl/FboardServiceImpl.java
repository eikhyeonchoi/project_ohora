package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.FboardDao;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;
import bitcamp.team.service.FboardService;

@Service
public class FboardServiceImpl implements FboardService {

  FboardDao boardDao;

  public FboardServiceImpl(FboardDao boardDao) {
    this.boardDao = boardDao;
  }

  @Override
  public List<Fboard> list() {
    return boardDao.findAll();
  }

  @Override
  public int add(Fboard board) {
    return boardDao.insert(board);
  }

  @Override
  public Fboard get(int no) {
    Fboard board = boardDao.findByNo(no);
    if (board != null) {
      boardDao.increaseCount(no);
    }
    return board;
  }

  @Override
  public int update(Fboard board) {
    return boardDao.update(board);
  }

  @Override
  public int delete(int no) {
    return boardDao.delete(no);
  }

  @Override
  public int size() {
    return boardDao.countAll();
  }

  @Override
  public List<FboardComment> commentList(int no) {
    return boardDao.findCommentAll(no);
  }

  @Override
  public int addComment(FboardComment fboardComment) {
    return boardDao.insertComment(fboardComment);
  }

  @Override
  public int deleteComment(int no) {
    return boardDao.deleteComment(no);
  }
}