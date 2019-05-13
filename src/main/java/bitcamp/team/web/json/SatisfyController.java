package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Satisfy;
import bitcamp.team.service.SatisfyService;

@RestController("json/SatisfyController")
@RequestMapping("/json/satisfy")
public class SatisfyController {
  
  @Autowired SatisfyService satisfyService;
  
  @GetMapping("list")
  public Object list() throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", satisfyService.list());

    return map;
  }
  
  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    return satisfyService.get(no);
  }
  
  
  
  
}
