package bitcamp.team.third.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.third.domain.Notice;
import bitcamp.team.third.service.NoticeService;

@RestController("json/NoticeController")
@RequestMapping("/json/notice")
public class NoticeController {

  @Autowired
  NoticeService noticeService;

  @GetMapping("list")
  public Object list(@RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "3") int pageSize) {

    if (pageSize < 3 || pageSize > 8)
      pageSize = 3;

    int rowCount = noticeService.size();
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1)
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;

    List<Notice> boards = noticeService.list(pageNo, pageSize);

    HashMap<String, Object> content = new HashMap<>();
    content.put("list", boards);
    content.put("pageNo", pageNo);
    content.put("pageSize", pageSize);
    content.put("totalPage", totalPage);

    return content;
  }

}
