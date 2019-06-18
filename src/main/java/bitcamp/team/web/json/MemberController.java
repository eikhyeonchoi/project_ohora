package bitcamp.team.web.json;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
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
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.Review;
import bitcamp.team.service.AnswerService;
import bitcamp.team.service.FboardService;
import bitcamp.team.service.MemberService;
import bitcamp.team.service.QuestionService;
import bitcamp.team.service.ReviewService;
import bitcamp.team.service.TipHistoryService;
import bitcamp.team.service.TipService;
import bitcamp.team.web.Authentication.Gmail;
import bitcamp.team.web.Authentication.Gmail2;
import bitcamp.team.web.Authentication.RandomNo;

@RestController("json/MemberController")
@RequestMapping("/json/member")
public class MemberController {

  String uploadDir;

  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;

  @Autowired QuestionService questionService;
  @Autowired AnswerService answerService;
  @Autowired FboardService fboardService;
  @Autowired ReviewService reviewService;
  @Autowired TipService tipService;
  @Autowired TipHistoryService TipHistoryService;


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

  @GetMapping("secessionMember")
  public Object secessionMember(int memberNo) {
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> map = new HashMap<>();
    try {
      System.out.println("회원번호" + memberNo);
      List<Question> qNo = questionService.findQno(memberNo);
      questionService.delete2(qNo);
      List<Fboard> fNo = fboardService.findMyPost(memberNo);
      for (int i = 0; i < fNo.size(); i++) {
        fboardService.delete(fNo.get(i).getNo());
      }
      List<Review> rNo = reviewService.findMyPageReview(memberNo);
      for (int i = 0; i < rNo.size(); i++) {
        reviewService.delete(rNo.get(i).getNo());
      }
      String ranStr = UUID.randomUUID().toString();
      map.put("memberNo", memberNo);
      map.put("ranStr", ranStr);
      memberService.updateDeleteMember(map);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      e.printStackTrace();
      content.put("error", e.getMessage());
    }
    return content;
  };

  @RequestMapping("facebook")
  public Object facebook(String facebookId, String facebookName, String facebookPhoto) throws Exception {
    HashMap<String,Object> content = new HashMap<>(); // 리턴할 해쉬맵
    HashMap<String,Object> fbMap = new HashMap<>(); // DB에 파라미터로 넣을 해쉬맵
    this.uploadDir = servletContext.getRealPath("/upload/memberfile"); // 사진 경로
    String filename = UUID.randomUUID().toString(); // 사진 이름
    String fbuserInfo = UUID.randomUUID().toString().replace("-", "").substring(0,10); // email,pwd 등을 설정할 랜덤값
    String fbMemberId = facebookId + "@facebook.user"; // 페이스북 회원 id
    try {
      snsImageWrite(facebookPhoto, uploadDir, filename); // 사진 url을 파일로만들어서 지정한경로에 write하는 함수
      fbMap.put("snsId", fbMemberId); 
      fbMap.put("snsName", facebookName);
      fbMap.put("filename", filename);
      fbMap.put("snsUserInfo", fbuserInfo);
      fbMap.put("snsType", 4);
      
      Member fbMember = memberService.getEmail2(fbMemberId);
      if (fbMember == null) { // 페북 로그인시 처음 로그인하는 id인 경우
        memberService.authFacebook(fbMap);
      } else { // 페북 로그인시 이미 로그인했었던 id 일경우
        fbMap.put("fbMemberNo", fbMember.getNo());
        memberService.authUpdateFacebook(fbMap);
      }

      content.put("status", "success");

    } catch (Exception e) {
      e.printStackTrace();
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  };
  
  @RequestMapping("kakao")
  public Object kakao(String id, String nickName, String thumbnail) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> paramMap = new HashMap<>();
    this.uploadDir = servletContext.getRealPath("/upload/memberfile");
    String filename = UUID.randomUUID().toString();
    String kakaoUserInfo = UUID.randomUUID().toString().replace("-", "").substring(0,10); // email,pwd 등을 설정할 랜덤값
    String kakaoMemberId = id + "@kakao.user"; // 페이스북 회원 id
    
    try {
      snsImageWrite(thumbnail, uploadDir, filename); 
      paramMap.put("snsId", kakaoMemberId); 
      paramMap.put("snsName", nickName);
      paramMap.put("filename", filename);
      paramMap.put("snsUserInfo", kakaoUserInfo);
      paramMap.put("snsType", 5);
      
      
      Member kakaoMember = memberService.getEmail2(kakaoMemberId);
      if (kakaoMember == null) {
        memberService.authFacebook(paramMap);
      } else { // 페북 로그인시 이미 로그인했었던 id 일경우
        paramMap.put("fbMemberNo", kakaoMember.getNo());
        memberService.authUpdateFacebook(paramMap);
      }
      
      content.put("status", "success");

    } catch (Exception e) {
      e.printStackTrace();
      content.put("status", "fail");
      content.put("message", e.getMessage());
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


  private void snsImageWrite(String src, String uploadDir, String filename) throws Exception  {
    URL url = new URL(src);
    BufferedImage image = ImageIO.read(url);
    File file = new File(uploadDir + "/" + filename + "_thumb");
    ImageIO.write(image, "png", file);
  }

}



