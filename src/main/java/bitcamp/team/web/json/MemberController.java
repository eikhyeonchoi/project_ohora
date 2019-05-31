
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
import bitcamp.team.service.MemberService;
import bitcamp.team.web.Authentication.Gmail;
import bitcamp.team.web.Authentication.RandomNo;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  @Autowired MemberService memberService;

  @PostMapping("add")
  public Object add(Member member, HttpSession session) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (member.getType().equals("2")) {
        session.setAttribute("companyMember", member);
      } else {
        memberService.add(member);
      }
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("email")
  public Object Authentication (String email) throws Exception {
    HashMap<String,Object> content = new HashMap<>();

    int emailNo = memberService.getEmail(email);
    if (emailNo == 0) {
      Gmail gmail = new Gmail();
      int ranNo = RandomNo.randomNo();

      String emailStatus = gmail.gmailSend(email, ranNo);
      if (emailStatus.equals("success")) {
        content.put("status", "success");
        content.put("ranNo", ranNo);
      } else {
        content.put("status", "fail");
      }
      return content;
    } else {
      content.put("nop", 0);
      return content;
    }
  }

  @GetMapping("nickName")
  public Object detail(String nickName) throws Exception {
    int abcd = memberService.authEmail(nickName);
    return abcd;
  }

  @GetMapping("password")
  public Object password(String email, String password) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    Member member = memberService.getEmailPassword(email, password);
    if (member != null) {
      content.put("status", "success");
    } else {
      content.put("status", "fail");
    }
    return content;
  }

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

}



