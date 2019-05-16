package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;

public interface FboardService {
  List<Fboard> list();
  int add(Fboard board);
  Fboard get(int no);
  int update(Fboard board);
  int delete(int no);
  int size();
  
  List<FboardComment> commentList(int no);
  int addComment(FboardComment fboardComment);
}
