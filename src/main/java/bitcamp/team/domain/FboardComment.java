package bitcamp.team.domain;

public class FboardComment {
  private int no;
  private int memberNo;
  private int fboardNo;
  private String contents;
  private String createdDate;
  private int depth;
  private int parentId;
  
  private Member member;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public int getFboardNo() {
    return fboardNo;
  }

  public void setFboardNo(int fboardNo) {
    this.fboardNo = fboardNo;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public String getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(String createdDate) {
    this.createdDate = createdDate;
  }

  public int getDepth() {
    return depth;
  }

  public void setDepth(int depth) {
    this.depth = depth;
  }

  public int getParentId() {
    return parentId;
  }

  public void setParentId(int parentId) {
    this.parentId = parentId;
  }

  public Member getMember() {
    return member;
  }

  public void setMember(Member member) {
    this.member = member;
  }
  
  
  
  
  
}
