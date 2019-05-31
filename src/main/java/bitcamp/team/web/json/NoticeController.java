package bitcamp.team.web.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Notice;
import bitcamp.team.domain.NoticeFile;
import bitcamp.team.service.NoticeService;

@RestController("json/NoticeController")
@RequestMapping("/json/notice")
public class NoticeController {
  @Autowired
  NoticeService noticeService;
  @Autowired
  ServletContext servletContext;

  @PostMapping("upload")
  public Object upload(Part[] noticeFile) {
    ArrayList<NoticeFile> files = new ArrayList<>();

    try {
      for (Part part : noticeFile) {
        String filename = UUID.randomUUID().toString();
        String filepath = servletContext.getRealPath("/upload/notice/" + filename);
        part.write(filepath);
        NoticeFile file = new NoticeFile();
        file.setFilePath(filename);
        files.add(file);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return files;
  }

  @PostMapping("add")
  public Object add(Part[] noticeFile, Notice notice) {
    HashMap<String, Object> content = new HashMap<>();
    ArrayList<NoticeFile> files = new ArrayList<>();
    try {
      if (notice.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (notice.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }
      if (noticeFile != null) {
        for (Part part : noticeFile) {
          String filename = UUID.randomUUID().toString();
          String filepath = servletContext.getRealPath("/upload/notice/" + filename);
          part.write(filepath);

          NoticeFile file = new NoticeFile();
          file.setFilePath(filename);
          files.add(file);
        }
        notice.setNoticeFile(files);
      }
      noticeService.add(notice);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("delete")
  public Object delete(int no) {

    HashMap<String, Object> content = new HashMap<>();
    try {
      if (noticeService.delete(no) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) {
    return noticeService.get(no);
  }

  @GetMapping("list")
  public Object list(String keyword, String searchType) {

    List<Notice> notice = noticeService.list(keyword, searchType);

    HashMap<String, Object> content = new HashMap<>();
    content.put("list", notice);
    content.put("keyword", keyword);
    content.put("searchType", searchType);

    return content;
  }

  @PostMapping("update")
  public Object update(Notice notice) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (noticeService.update(notice) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("files")
  public Object files(int no) {
    HashMap<String, Object> contents = new HashMap<>();
    try {
      Notice files = noticeService.getFile(no);
      contents.put("files", files);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

}
