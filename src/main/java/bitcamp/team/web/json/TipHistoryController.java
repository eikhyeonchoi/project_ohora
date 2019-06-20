package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.TipHistory;
import bitcamp.team.service.TipHistoryService;
import bitcamp.team.service.TipService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/TipHistoryController")
@RequestMapping("/json/tiphistory")
public class TipHistoryController {

  TipService tipService;
  TipHistoryService tipHistoryService;
  HttpSession httpSession;
  
  public TipHistoryController(
      TipService tipService,
      TipHistoryService tipHistoryService,
      HttpSession httpSession) {
    this.tipService = tipService;
    this.tipHistoryService = tipHistoryService;
    this.httpSession = httpSession;
  }
  
  @GetMapping("list")
  public Object list(int no) throws Exception {
    List<TipHistory> history = tipHistoryService.get(no);
    
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", history);

    return map;
  }

  @PostMapping("add")
  public Object add(TipHistory tipHistory, int no) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    
    try {
      Member member = (Member) httpSession.getAttribute("loginUser");
      tipHistory.setNickName(member.getNickName());
      tipHistory.setTipNo(tipService.getNo(no));
      tipHistoryService.add(tipHistory);
      contents.put("status", "success");

    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("message", e.getMessage());

    }
    return contents;
  }
  
  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      TipHistory history = tipHistoryService.detail(no);
      contents.put("status", "success");
      contents.put("history", history);
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("message", e.getMessage());
    }
    return contents;
  }
  
}