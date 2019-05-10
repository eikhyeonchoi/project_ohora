package bitcamp.team.domain;

public class manufacturer {

  private int no;
  private String name;
  private String tel;
  private String haomPage;
  private String registerNo;

  @Override
  public String toString() {
    return "manufacturer [no=" + no + ", name=" + name + ", tel=" + tel + ", haomPage=" + haomPage
        + ", registerNo=" + registerNo + "]";
  }

  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getHaomPage() {
    return haomPage;
  }
  public void setHaomPage(String haomPage) {
    this.haomPage = haomPage;
  }
  public String getRegisterNo() {
    return registerNo;
  }
  public void setRegisterNo(String registerNo) {
    this.registerNo = registerNo;
  }

}




