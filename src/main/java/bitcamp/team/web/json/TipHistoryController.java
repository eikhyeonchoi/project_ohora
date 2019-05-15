package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.TipHistory;
import bitcamp.team.service.TipHistoryService;
import bitcamp.team.service.TipService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/TipHistoryController")
@RequestMapping("/json/tiphistory")
public class TipHistoryController {

  @Autowired TipService tipService;
  @Autowired TipHistoryService tipHistoryService;

  @GetMapping("list")
  public Object list(int no) throws Exception {
    List<TipHistory> history = tipHistoryService.get(no);
    int count = 0;
    for (TipHistory his : history) {
      if (his != null)
        count++;
      else
        break;
    }
    for (int i = count - 1; i > 9; i--) {
      tipHistoryService.delete(history.remove(i).getNo());
    }
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", history);

    return map;
  }


  @PostMapping("add")
  public Object add(TipHistory tipHistory) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    
    try {
      tipHistoryService.add(tipHistory);
      contents.put("status", "success");

    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("message", e.getMessage());

    }
    return contents;
  }
}