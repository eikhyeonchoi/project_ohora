package bitcamp.team.domain;
import java.io.Serializable;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private int no;
  private String email;
  private String name;
  private String password;
  private String nickName;
  private String tel;
  private int type;
  private boolean ban;
  private int manufacNo;
  
  private Manufacturer manufacturer;
  
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
  public int getType() {
    return type;
  }
  public void setType(int type) {
    this.type = type;
  }
  public boolean isBan() {
    return ban;
  }
  public void setBan(boolean ban) {
    this.ban = ban;
  }
  public Manufacturer getManufacturer() {
    return manufacturer;
  }
  public void setManufacturer(Manufacturer manufacturer) {
    this.manufacturer = manufacturer;
  }
  public int getManufacNo() {
    return manufacNo;
  }
  public void setManufac_no(int manufac_no) {
    this.manufacNo = manufac_no;
  }
  @Override
  public String toString() {
    return "Member [no=" + no + ", email=" + email + ", name=" + name + ", password=" + password
        + ", nickName=" + nickName + ", tel=" + tel + ", type=" + type + ", ban=" + ban
        + ", manufacNo=" + manufacNo + ", manufacturer=" + manufacturer + "]";
  }
}
