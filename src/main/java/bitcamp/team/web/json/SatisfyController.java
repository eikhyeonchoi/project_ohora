package bitcamp.team.web.json;

import java.util.HashMap;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
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
  
  @PostMapping("add")
  public Object add(Satisfy satisfy,
      ServletRequest request) throws Exception{
    
    HttpServletRequest httpReq = (HttpServletRequest) request;
    Member loginUser = (Member) httpReq.getSession().getAttribute("loginUser");
    
    HashMap<String,Object> content = new HashMap<>();
    
    try {
      satisfy.setmNo(loginUser.getNo());
      satisfyService.add(satisfy);
      
      if (satisfy.getLevel() > 5 || satisfy.getLevel() < 0) {
        throw new Exception("0~5 숫자 입력");
      } else if (satisfy.getUnderstand() > 5 || satisfy.getUnderstand() < 0) {
        throw new Exception("0~5 숫자 입력");
      } else if (satisfy.getDesign() > 5 || satisfy.getDesign() < 0) {
        throw new Exception("0~5 숫자 입력");
      } else if (satisfy.getAsStf() > 5 || satisfy.getAsStf() < 0) {
        throw new Exception("0~5 숫자 입력");
      } else if (satisfy.getUseful() > 5 || satisfy.getUseful() < 0) {
        throw new Exception("0~5 숫자 입력");
      } else if (satisfy.getPriceStf() > 5 || satisfy.getPriceStf() < 0) {
        throw new Exception("0~5 숫자 입력");
      }
      
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add
  
  
  
}
