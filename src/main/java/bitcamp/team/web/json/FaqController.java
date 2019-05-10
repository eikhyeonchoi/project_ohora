package bitcamp.team.web.json;

import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Faq;
import bitcamp.team.service.FaqService;

@RestController("json/FaqController")
@RequestMapping("/json/faq")
public class FaqController {

  FaqService faqService;

  public FaqController(FaqService faqService) {
    this.faqService = faqService;
  }

  @GetMapping("list")
  public Object list() {
    return faqService.list();
  } // list

  @GetMapping("detail")
  public Object detail(int no) {
    Faq faq = faqService.get(no);
    HashMap<String,Object> content = new HashMap<>();
    content.put("faq", faq);
    return content;
  } // detail

  @PostMapping("add")
  public Object add(Faq faq) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (faq.getTitle() == "" ||
          faq.getContents() == "")
        throw new Exception("필수 입력 사항을 입력하지 않았습니다");

      faqService.add(faq);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add

  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (faqService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // delete


  @PostMapping("update")
  public Object update(Faq faq) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (faqService.update(faq) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      
      
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // update
}










