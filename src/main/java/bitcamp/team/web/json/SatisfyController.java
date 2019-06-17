package bitcamp.team.web.json;

import java.util.HashMap;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Satisfy;
import bitcamp.team.service.SatisfyService;

@RestController("json/SatisfyController")
@RequestMapping("/json/satisfy")
public class SatisfyController {
  
  SatisfyService satisfyService;
  HttpSession httpSession;
  
  public SatisfyController(
      SatisfyService satisfyService,
      HttpSession httpSession) {
    this.satisfyService = satisfyService;
    this.httpSession = httpSession;
  }
  
  @GetMapping("list")
  public Object listByProductNo(@RequestParam(required = false, defaultValue = "0") int productNo) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> params = new HashMap<>();
    
    if (productNo != 0) {
      params.put("productNo", productNo);
    }
    
    content.put("list", satisfyService.list(params));
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    return satisfyService.get(no);
  }
  
  @PostMapping("add")
  public Object add(Satisfy satisfy) throws Exception{
    HashMap<String,Object> content = new HashMap<>();
    
    try {
      Member member = (Member) httpSession.getAttribute("loginUser");
      satisfy.setmNo(member.getNo());
      
      if (satisfy.getLevel() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getUnderstand() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getDesign() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getAsStf() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getUseful() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getPriceStf() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      }
      
      satisfyService.add(satisfy);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add
  
  @PostMapping("update")
  public Object update(Satisfy satisfy) throws Exception{
    HashMap<String,Object> content = new HashMap<>();
    
    try {
      Member member = (Member) httpSession.getAttribute("loginUser");
      satisfy.setmNo(member.getNo());
      
      if (satisfy.getLevel() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getUnderstand() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getDesign() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getAsStf() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getUseful() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      } else if (satisfy.getPriceStf() == 0) {
        throw new Exception("입력이 안된 점수가 있습니다");
      }
      
      satisfyService.update(satisfy);
      content.put("status", "success");
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add
  
  @GetMapping("delete")
  public Object delete(@RequestParam(defaultValue = "0") int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (no == 0) {
        throw new Exception("만족도 번호가 없습니다");
      }
      
      if (satisfyService.delete(no) == 0) {
        throw new Exception("삭제 실패");
      }
      
      content.put("status", "success");
      
    } catch(Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
      
    }
    
    return content;
  }
  
  
}












