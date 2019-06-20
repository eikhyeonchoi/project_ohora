package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.Tip;
import bitcamp.team.domain.TipHistory;
import bitcamp.team.service.MemberService;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.TipHistoryService;
import bitcamp.team.service.TipService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/TipController")
@RequestMapping("/json/tip")
public class TipController {

  @Autowired TipService tipService;
  @Autowired ProductService productService;
  @Autowired MemberService memberService;
  @Autowired TipHistoryService tipHistoryService;
  @Autowired HttpSession httpSession;
  
  @GetMapping("list")
  public Object list(String keyword) throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    try {
      List<Tip> tips = tipService.list(keyword);

      map.put("list", tips);
      map.put("status", "success");
      
    } catch (Exception e) {
      map.put("status", "fail");
      map.put("error", e.getMessage());
    }
    return map;
  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Tip tip = tipService.get(no);
    return tip;
  }

  @PostMapping("add")
  public Object add(Tip tip, Product product) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Tip tips = tip;
      System.out.println(product);
      int prodNo = productService.getNo(product.getName());
      Member member = (Member)httpSession.getAttribute("loginUser");
      tips.setMemberNo(member.getNo());
      tips.setProductNo(prodNo);
      tipService.add(tips);

      TipHistory his = new TipHistory();
      his.setTipNo(tipService.getNo(prodNo));
      his.setContents(tips.getContents());
      his.setNickName(member.getNickName());
      tipHistoryService.add(his);

      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @PostMapping("update")
  public Object update(Tip tip, String name) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      int tipNo = tipService.getNo(productService.getNo(name));
      Member member = (Member) httpSession.getAttribute("loginUser");

      Tip tips = tip;
      tips.setNo(tipNo);
      tips.setMemberNo(member.getNo());
      tips.setProductNo(productService.getNo(name));
      
      if(tipService.updateTip(tips) == 0)
        throw new RuntimeException("해당 번호의 팁이 존재하지 않습니다.");
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @PostMapping("rollback")
  public Object rollback(Tip tip, Product product, int hisNo) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      int tipNo = tipService.getNo(product.getNo());
      Tip tips = tipService.getTip(tipNo);
      for (TipHistory his : tipHistoryService.get(product.getNo())) {
        if (his.getNo() == tipHistoryService.detail(hisNo).getNo()) {
          tips.setContents(his.getContents());
          tips.setCreatedDate(his.getUpdateDate());
          tips.setMemberNo(memberService.getNo(his.getNickName()));
          break;
        } else {
          tipHistoryService.delete(his.getNo());
        }
      }
      if(tipService.updateTip(tips) == 0)
        throw new RuntimeException("해당 번호의 팁이 존재하지 않습니다.");

      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @GetMapping("confirm")
  public Object confirm(Product product) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      if (tipService.confirm(productService.getNo(product.getName())) == 1) {
        contents.put("confirm", "exist");
      } else {
        contents.put("confirm", "empty");
      }
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @GetMapping("productName")
  public Object get(int no) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Product product = productService.get(no);
      String prd = product.getName();
      contents.put("status", "success");
      contents.put("product", prd);
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }

    return contents;
  }
}