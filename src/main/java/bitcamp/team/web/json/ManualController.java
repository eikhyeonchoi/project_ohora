package bitcamp.team.web.json;

import javax.servlet.ServletContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
  
  


}
