package bitcamp.team.web.json;
import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import java.util.Collections;
import java.util.HashMap;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import bitcamp.team.domain.Member;
import bitcamp.team.service.MemberService;

@RestController
public class GoogleSignInController {

  String uploadDir;

  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;

  private static final HttpTransport transport = new NetHttpTransport();
  private static final JacksonFactory jsonFactory = new JacksonFactory();

  @RequestMapping("/gmailsignin")
  public Object gmail(String token) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> gmailContents = new HashMap<>();
    this.uploadDir = servletContext.getRealPath("/upload/memberfile");
    String filename = UUID.randomUUID().toString();
    String gmailUserInfo = UUID.randomUUID().toString().replace("-", "").substring(0,10); // email,pwd 등을 설정할 랜덤값

    GoogleIdTokenVerifier verifier 
      = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
      .setAudience(Collections.singletonList(
            "865288255206-ovp5h2ha490f68njcqtdmos8n3hc5ld5.apps.googleusercontent.com"))
      .build();
    GoogleIdToken idToken;
    try {
      idToken = verifier.verify(token);
      
      if (idToken != null) {
        Payload payload = idToken.getPayload();
  
        if (Boolean.valueOf(payload.getEmailVerified())) {
          String gmailMemberId = payload.getSubject() + "@gmail.user";
          snsImageWrite((String) payload.get("picture"), uploadDir, filename);
          gmailContents.put("snsId", gmailMemberId);
          gmailContents.put("snsName", (String) payload.get("name"));
          gmailContents.put("filename", filename);
          gmailContents.put("snsUserInfo", gmailUserInfo);
          gmailContents.put("snsType", 6);
           
          Member gmailMember = memberService.getEmail2(gmailMemberId);
          if (gmailMember == null) {
            memberService.authFacebook(gmailContents);
          } else {
            gmailContents.put("fbMemberNo", gmailMember.getNo());
            memberService.authUpdateFacebook(gmailContents);
            }
          content.put("status", "success");
         }
      } else {
        content.put("status", "fail");
        content.put("message", "토큰이 정확하지 않습니다.");
      }
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", "Invalid Id token : " + e.getMessage());
    }
    return content;
  };
  
  private void snsImageWrite(String src, String uploadDir, String filename) throws Exception  {
    URL url = new URL(src);
    BufferedImage image = ImageIO.read(url);
    File file = new File(uploadDir + "/" + filename + "_thumb");
    ImageIO.write(image, "png", file);
  }
}



