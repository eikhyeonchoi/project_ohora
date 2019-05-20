package bitcamp.team.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
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
  public HashMap<String, Object> commentList(int no) {
    ArrayList<FboardComment> requestList = (ArrayList<FboardComment>) boardDao.findCommentAll(no);
    ArrayList<FboardComment> parentComment = new ArrayList<FboardComment>();
    ArrayList<FboardComment> childComment = new ArrayList<FboardComment>();
    HashMap<String, Object> content = new HashMap<String, Object>();
    
    for (FboardComment comment : requestList) {
      if(comment.getParentId() == 0) {
        parentComment.add(comment);
      } else {
        childComment.add(comment);
      }
    }
    content.put("list",parentComment);
    content.put("clist",childComment);
    
    return content;
  }

  @Override
  public int addComment(FboardComment fboardComment) {
    return boardDao.insertComment(fboardComment);
  }

  @Override
  public int deleteComment(int no) {
    return boardDao.deleteComment(no);
  }

  @Override
  public int updateComment(HashMap<String, Object> param) {
    return boardDao.updateComment(param);
  }

  @Override
  public List<FboardComment> findReply(HashMap<String, Object> param) {
    return boardDao.findReply(param);
  }
}