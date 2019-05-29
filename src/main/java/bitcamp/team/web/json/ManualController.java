package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Manual;
import bitcamp.team.service.ManualService;

@RestController("json/ManualController")
@RequestMapping("/json/manual")
public class ManualController {

  ManualService manualService;
  ServletContext servletContext;

  public ManualController(
      ManualService manualService, 
      ServletContext servletContext) {
    this.manualService = manualService;
    this.servletContext = servletContext;
  }
  
  @GetMapping
  public Object list(String keyword, String searchType) {
    HashMap<String,Object> contents = new HashMap<>();
    
    try {
      List<Manual> list = manualService.list(keyword, searchType);
      
      contents.put("list", list);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    
    return contents;
  }


}
