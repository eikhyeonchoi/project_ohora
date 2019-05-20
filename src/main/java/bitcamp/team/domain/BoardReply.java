package bitcamp.team.domain;

public class BoardReply {
  private int no;
  private int boardId;
  private int parentId;
  private int memberId;
  private int depth;
  private String memberName;
  private String contents;
  private String registerDate;

  @Override
  public String toString() {
    return "BoardReply [no=" + no + ", boardId=" + boardId + ", parentId=" + parentId
        + ", memberId=" + memberId + ", depth=" + depth + ", memberName=" + memberName
        + ", contents=" + contents + ", registerDate=" + registerDate + "]";
  }

  public String getMemberName() {
    return memberName;
  }

  public void setMemberName(String memberName) {
    this.memberName = memberName;
  }

  public int getMemberId() {
    return memberId;
  }

  public void setMemberId(int memberId) {
    this.memberId = memberId;
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getBoardId() {
    return boardId;
  }

  public void setBoardId(int boardId) {
    this.boardId = boardId;
  }

  public int getParentId() {
    return parentId;
  }

  public void setParentId(int parentId) {
    this.parentId = parentId;
  }

  public int getDepth() {
    return depth;
  }

  public void setDepth(int depth) {
    this.depth = depth;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public String getRegisterDate() {
    return registerDate;
  }

  public void setRegisterDate(String registerDate) {
    this.registerDate = registerDate;
  }


}
