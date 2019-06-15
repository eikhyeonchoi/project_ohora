package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.domain.Product;

public interface ManualService {
  int add(Manual manual);
  Manual getFile(int no);
  List<Manual> get(int no);
  List<Manual> list(String keyword, String searchType);
  List<ManualFile> typeFileList(int no);
  List<Product> getAllProduct();
  Manual confirm(int no);
  int delete(int no);
}
