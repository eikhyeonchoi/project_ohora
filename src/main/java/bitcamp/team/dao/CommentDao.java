package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Comment;

public interface CommentDao {
  List<Comment> findAll();
}
