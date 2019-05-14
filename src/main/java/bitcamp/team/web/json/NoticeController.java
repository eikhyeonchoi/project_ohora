package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Notice;
import bitcamp.team.service.NoticeService;

@RestController("json/NoticeController")
@RequestMapping("/json/notice")
public class NoticeController {

  @Autowired
  NoticeService noticeService;

  @PostMapping("add")
  public Object add(Notice notice, ServletRequest request) {
    HashMap<String, Object> content = new HashMap<>();

    HttpServletRequest httpReq = (HttpServletRequest) request;
    Member loginUser = (Member) httpReq.getSession().getAttribute("loginUser");

    try {
      if (notice.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (notice.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }
      if (loginUser.getType() == 3) {
        noticeService.add(notice);
        content.put("status", "success");
      } else {
        throw new RuntimeException("글을 쓸 권한이 없습니다.");
      }
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
  public Object detail(int no, ServletRequest request) {
    HashMap<String, Object> content = new HashMap<>();

    HttpServletRequest httpReq = (HttpServletRequest) request;
    Member member = new Member();
    Member loginUser = (Member) httpReq.getSession().getAttribute("loginUser");
    if (loginUser == null) {
      loginUser = member;
    }

    Notice notice = noticeService.get(no);

    content.put("loginUser", loginUser);
    content.put("notice", notice);
    return content;
  }

  @GetMapping("list")
  public Object list(@RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "10") int pageSize, String keyword, String searchType,
      ServletRequest request) {

    HttpServletRequest httpReq = (HttpServletRequest) request;
    Member member = new Member();
    Member loginUser = (Member) httpReq.getSession().getAttribute("loginUser");
    if (loginUser == null) {
      loginUser = member;
    }

    if (pageSize < 10 || pageSize > 18)
      pageSize = 10;

    int rowCount = noticeService.size(keyword);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1)
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Notice> notice = noticeService.list(pageNo, pageSize, keyword, searchType);

    HashMap<String, Object> content = new HashMap<>();
    content.put("loginUser", loginUser);
    content.put("list", notice);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);
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

}
