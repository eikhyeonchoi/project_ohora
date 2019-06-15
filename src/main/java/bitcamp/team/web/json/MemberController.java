package bitcamp.team.web.json;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.service.MemberService;
import bitcamp.team.web.Authentication.Gmail;
import bitcamp.team.web.Authentication.Gmail2;
import bitcamp.team.web.Authentication.RandomNo;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  String uploadDir;

  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;

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

  @RequestMapping("updatePassword")
  public Object updatePassword(Member member, String pwdUpdateDate) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    HashMap<String,Object> content = new HashMap<>();

    paramMap.put("no", member.getNo());
    paramMap.put("password", member.getPassword());
    paramMap.put("passwordUpdateDate", pwdUpdateDate);
    try {
      memberService.updatePassword(paramMap);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @RequestMapping("updateName")
  public Object updateName(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();

    System.out.println(member);
    try {
      memberService.updateName(member);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @RequestMapping("updateNickname")
  public Object updateNickname(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();

    try {
      memberService.updateNickname(member);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @RequestMapping("updateTel")
  public Object updateTel(Member member) throws Exception {
    HashMap<String,Object> content = new HashMap<>();

    try {
      memberService.updateTel(member);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @RequestMapping("updateFile")
  public Object updateFile(Member member, Part memberFile, HttpSession session) {
    this.uploadDir = servletContext.getRealPath("/upload/memberfile");
    HashMap<String,Object> content = new HashMap<>();
    try {
      String filename = UUID.randomUUID().toString();
      String filepath = uploadDir + "/" + filename; 
      memberFile.write(filepath);
      member.setFilePath(filename);
      memberService.updatePhoto(member);
      content.put("status", "success");
      
      try {
        makeThumbnail(filepath);
      } catch(Exception e) {
        throw new Exception("썸네일 생성 중 오류 발생");
      }

    } catch (Exception e) {
      content.put("status","fail");
      content.put("error",e.getMessage());
    }
    return content;
  }

  @GetMapping("deleteFile")
  public Object deleteFile(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (memberService.deletePhoto(no) == 0)
        throw new Exception("삭제중 오류가 발생했습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    return content;
  };

  @GetMapping("forgetPassword")
  public Object forgetPassword(Member member) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      Member member2 = memberService.findByNameEmail(member);
      if (member2 == null)
        throw new Exception("회원명 또는 이메일을 정확하게 입력해주세요.");

      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    return content;
  };

  @GetMapping("forgetPasswordEmailSend")
  public Object forgetPasswordEmailSend(Member member) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      Gmail2 gmail2 = new Gmail2();
      String uuid = UUID.randomUUID().toString();
      String[] newPassword = uuid.split("-");
      String emailStatus = gmail2.gmailSend(member.getEmail(), member.getName(), newPassword[0]);
      if (!emailStatus.equals("success"))
        throw new Exception("메일 전송중 오류가 발생했습니다.");
      
      memberService.updatePassword2(member.getEmail() ,newPassword[0]);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    return content;
  };
  
  

  private void makeThumbnail(String filePath) throws Exception { 
    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
    int dw = 50, dh = 50; 
    int ow = srcImg.getWidth(); 
    int oh = srcImg.getHeight(); 
    int nw = ow; 
    int nh = (ow * dh) / dw;
    if(nh > oh) { nw = (oh * dw) / dh; nh = oh; } 
    BufferedImage cropImg = Scalr.crop(srcImg, (ow-nw)/2, (oh-nh)/2, nw, nh);
    BufferedImage destImg = Scalr.resize(cropImg, dw, dh); 
    File thumbFile = new File(filePath + "_thumb");
    ImageIO.write(destImg, "jpg", thumbFile);
  } // makeThumbnail
  
  
}



