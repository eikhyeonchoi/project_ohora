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
import bitcamp.team.domain.QuestionFile;
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
    if (board.getFboardFiles() != null) {
      List<FboardFile> fboardFiles = board.getFboardFiles();
      for (FboardFile file : fboardFiles) {
        System.out.println(board.getNo());
        file.setFboardNo(board.getNo());
      } // for
      fboardFileDao.insert(fboardFiles);
    } // if
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
    return fboardDao.update(board);
  }

  @Override
  public int delete(int no) {
    fboardFileDao.delete(no);
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
}