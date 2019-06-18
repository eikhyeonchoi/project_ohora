package bitcamp.team.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualComment;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.domain.Product;

public interface ManualService {
  List<Manual> get(int no);
  List<Manual> list(String keyword, String searchType);
  List<ManualFile> typeFileList(int no);
  List<Product> getAllProduct();
  List<ManualComment> findReply(Map<String,Object> param);
  Manual getFile(int no);
  Manual confirm(int no);
  HashMap<String,Object> commentList(int no);
  int add(Manual manual);
  int delete(int no);
  int addComment(ManualComment keyword);
  int updateComment(Map<String,Object> param);
  int deleteComment(int no);
}
