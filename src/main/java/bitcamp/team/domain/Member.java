package bitcamp.team.domain;
import java.io.Serializable;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private String email;
  private String name;
  private String password;
  private String nickName;
  private String tel;
  private String type;
  private boolean ban;
  private String filePath;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date passwordUpdateDate;

  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getNickName() {
    return nickName;
  }
  public void setNickName(String nickName) {
    this.nickName = nickName;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public boolean isBan() {
    return ban;
  }
  public void setBan(boolean ban) {
    this.ban = ban;
  }
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  public Date getPasswordUpdateDate() {
    return passwordUpdateDate;
  }
  public void setPasswordUpdateDate(Date passwordUpdateDate) {
    this.passwordUpdateDate = passwordUpdateDate;
  }

  @Override
  public String toString() {
    return "Member [no=" + no + ", email=" + email + ", name=" + name + ", password=" + password
        + ", nickName=" + nickName + ", tel=" + tel + ", type=" + type + ", ban=" + ban
        + ", filePath=" + filePath + ", passwordUpdateDate=" + passwordUpdateDate + "]";
  }

}

