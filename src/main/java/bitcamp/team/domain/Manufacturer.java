package bitcamp.team.domain;

public class Manufacturer {

  private int no;
  private String name;
  private String tel;
  private String homePage;
  private String registerNo;
  private int memberNo;
  private String address;

  private Member member;

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
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
  public String getHomePage() {
    return homePage;
  }
  public void setHomePage(String homePage) {
    this.homePage = homePage;
  }
  public String getRegisterNo() {
    return registerNo;
  }
  public void setRegisterNo(String registerNo) {
    this.registerNo = registerNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
  }

  @Override
  public String toString() {
    return "Manufacturer [no=" + no + ", name=" + name + ", tel=" + tel + ", homePage=" + homePage
        + ", registerNo=" + registerNo + ", memberNo=" + memberNo + ", address=" + address
        + ", member=" + member + "]";
  }

}




