package bitcamp.team.service.Impl;

import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.CommentDao;
import bitcamp.team.domain.Comment;
import bitcamp.team.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{

  CommentDao commentDao;
  
  public CommentServiceImpl(CommentDao commentDao) {
    this.commentDao = commentDao;
  }
  
  @Override
  public List<Comment> list() {
    return commentDao.findAll();
  }
  
  
  
  

}
