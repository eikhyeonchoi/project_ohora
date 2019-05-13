
package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.service.MemberService;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  @Autowired MemberService memberService;

  @PostMapping("add")
  public Object add(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    if (member.getType() == 1) {
      try {
        System.out.println(member);
        System.out.println("AAAA");
        memberService.add(member);
        content.put("status", "success");

      } catch (Exception e) {
        content.put("status", "fail");
        content.put("message", e.getMessage());

      }
      return content;
    } else {

      content.put("status", "fail");
      return content;
    }
  }

  //  @GetMapping("delete")
  //  public Object delete(int no) throws Exception {
  //
  //    HashMap<String,Object> map = new HashMap<>();
  //    try {
  //      if (memberService.delete(no) == 0)
  //        throw new RuntimeException("해당 번호의 수업이 없습니다.");
  //      map.put("status", "success");
  //    } catch (Exception e) {
  //      map.put("status", "fail");
  //      map.put("message", e.getMessage());
  //    }
  //    return map;
  //  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Member member = memberService.get(no);
    return member;
  }

  @GetMapping("list")
  public Object list() throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    List<Member> members = memberService.list();
    map.put("list", members);

    return map;
  }

  @PostMapping("update")
  public Object update(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {

      if (memberService.update(member) == 0) 
        throw new Exception("해당 번호의 수업이 없습니다.");

      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
}



