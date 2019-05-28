package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;

public interface ManualService {
  int add(Manual manual);
  List<ManualFile> typeFileList(int no);
}
