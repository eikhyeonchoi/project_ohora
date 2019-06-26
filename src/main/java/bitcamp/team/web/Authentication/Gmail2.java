package bitcamp.team.web.Authentication;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Gmail2 {

  public String gmailSend(String email, String name, String newPassword) {
    String user = "dencw6"; // 네이버일 경우 네이버 계정, gmail경우 gmail 계정
    String password = "ccqmbovyndwopkwf"; // 패스워드

    // SMTP 서버 정보를 설정한다.
    Properties prop = new Properties();
    prop.put("mail.smtp.host", "smtp.gmail.com"); 
    prop.put("mail.smtp.port", 465); 
    prop.put("mail.smtp.auth", "true"); 
    prop.put("mail.smtp.ssl.enable", "true"); 
    prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

    Session session = Session.getDefaultInstance(prop, new javax.mail.Authenticator() {
      protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(user, password); // 메일을 발송할 실제 id, password
      }
    });

    try {
      MimeMessage message = new MimeMessage(session);
      message.setFrom(new InternetAddress(user));

      // 수신자메일주소
      message.addRecipient(Message.RecipientType.TO, new InternetAddress(email)); 

      message.setSubject("Ohora 임시비밀번호 입니다."); //메일 제목을 입력

      message.setContent(
          
          "  <div style=\"width: 500px; height: 600px; margin: 0 auto;\">\n" + 
          "    <img alt=\"자물쇠\"\n" + 
          "      src=\"https://cdn.pixabay.com/photo/2016/12/18/12/49/cyber-security-1915628_960_720.png\"\n" + 
          "      style=\"width: 120px; height: 120px; float: right; margin-top: -38px;\">\n" + 
          "    <h1 style=\"margin-top: 20px; color: #2E9AFE;\">\n" + 
          "      Ohora 에서 <span style=\"color: #585858\">알려드립니다.</span>\n" + 
          "    </h1>\n" + 
          "    <p style=\"margin-bottom: 30px; color: #585858; margin-top: 10px; font-size: 13px;\">365일\n" + 
          "      고객만족을위해 최선을 다하겠습니다.</p>\n" + 
          "    <hr style=\"border: 1px solid #6E6E6E;\">\n" + 
          "    <p style=\"font-size: 14px; color: #6E6E6E; margin-top: 20px;\">\n" + 
          "      <img alt=\"깃털\" src=\"http://www.pkicon.com/icons/7762/Feather-256.png\"\n" + 
          "        style=\"width: 10px; height: 10px; margin-right: 5px;\">안녕하세요 " + name + " 회원님,\n" + 
          "    </p>\n" + 
          "    <p style=\"font-size: 14px; color: #6E6E6E; margin-left: 15px; margin-bottom: 20px;\">요청하신 임시\n" + 
          "      비밀번호는 다음과 같습니다.</p>\n" + 
          "    <p\n" + 
          "      style=\"border-top: 1px solid #D8D8D8; border-bottom: 1px solid #D8D8D8; height: 37px; font-size: 14px; margin: 0 10px; padding-top: 20px; background-color: rgba(250, 250, 250, 0.9); text-align: center;\">임시비밀번호:\n" + 
          newPassword + "</p>\n" + 
          "    <div style=\"margin-left: 15px; font-size: 14px; color: #6E6E6E;\">\n" + 
          "      <p style=\"margin-top: 20px;\">임시 비밀번호를 사용하여 로그인 하신후 마이페이지에서 비밀번호를\n" + 
          "        변경해주셔야</p>\n" + 
          "      <p style=\"margin-bottom: 10px;\">안전한 개인정보 보호가 가능합니다.</p>\n" + 
          "      <p style=\"margin-bottom: 10px;\">다른 문의사항이 있으시면 고객센터로 문의해 주시기 바랍니다.</p>\n" + 
          "      <p>Tel: 010-1123-4456</p>\n" + 
          "      <p style=\"margin-bottom: 10px;\">Mail: ohora1123@gmail.com</p>\n" + 
          "      <p style=\"font-weight: bold;\">감사합니다.</p>\n" + 
          "    </div>\n" + 
          "  </div>", "text/html; charset=utf-8");
      
      // send the message
      Transport.send(message); ////전송
      return ("success");

    } catch (AddressException e) {
      e.printStackTrace();
      return ("fail");
    } catch (MessagingException e) {
      e.printStackTrace();
      return ("fail");

    }
  }
}
