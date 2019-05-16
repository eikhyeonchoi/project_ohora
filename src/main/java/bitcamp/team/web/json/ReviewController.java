package bitcamp.team.web.json;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.service.ReviewService;

@RestController("json/ReviewController")
@RequestMapping("/json/review")
public class ReviewController {
  
  @Autowired ReviewService reviewService;
  
  @GetMapping("list")
  public Object list() throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", reviewService.list());

    return map;
  }
  
  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    return reviewService.get(no);
  }

}
