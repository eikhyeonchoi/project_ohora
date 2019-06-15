package bitcamp.team.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.FboardDao;
import bitcamp.team.dao.FboardFileDao;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;
import bitcamp.team.domain.FboardFile;
import bitcamp.team.service.FboardService;

@Service
public class FboardServiceImpl implements FboardService {

  FboardDao fboardDao;
  FboardFileDao fboardFileDao;

  public FboardServiceImpl(
      FboardDao fboardDao,
      FboardFileDao fboardFileDao) {
    this.fboardDao = fboardDao;
    this.fboardFileDao = fboardFileDao;
  }

  @Override
  public List<Fboard> list(HashMap<String, Object> param) {
    return fboardDao.findAll(param);
  }

  @Override
  public int add(Fboard board) {
    int count = fboardDao.insert(board);
    return count;
  }

  @Override
  public Fboard get(int no) {
    Fboard board = fboardDao.findByNo(no);
    if (board != null) {
      fboardDao.increaseCount(no);
    }
    return board;
  }

  @Override
  public int update(Fboard board) {
    int count = 0;
    if (board.getContents() != null && board.getTitle() != null) {
      count = fboardDao.update(board);
    }
    return count;
  }

  @Override
  public int delete(int no) {
    fboardFileDao.deleteByFboardNo(no);
    fboardDao.deleteCommentFboard(no);
    return fboardDao.delete(no);
  }

  @Override
  public int size() {
    return fboardDao.countAll();
  }

  @Override
  public HashMap<String, Object> commentList(int no) {
    ArrayList<FboardComment> requestList = (ArrayList<FboardComment>) fboardDao.findCommentAll(no);
    HashMap<String, Object> content = new HashMap<String, Object>();

    content.put("list",requestList);

    return content;
  }

  @Override
  public int addComment(FboardComment fboardComment) {
    return fboardDao.insertComment(fboardComment);
  }

  @Override
  public int deleteComment(int no) {
    return fboardDao.deleteComment(no);
  }

  @Override
  public int updateComment(HashMap<String, Object> param) {
    return fboardDao.updateComment(param);
  }

  @Override
  public List<FboardComment> findReply(HashMap<String, Object> param) {
    return fboardDao.findReply(param);
  }

  @Override
  public List<Fboard> findMyPost(int memberNo) {
    return fboardDao.findByMemberNo(memberNo);
  }
}