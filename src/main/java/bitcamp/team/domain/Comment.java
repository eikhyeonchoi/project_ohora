package bitcamp.team.domain;

public class Comment {
  private int no;
  private int groupNo;
  private int sortNo;
  private int depth;
  private String contents;
  
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getGroupNo() {
    return groupNo;
  }
  public void setGroupNo(int groupNo) {
    this.groupNo = groupNo;
  }
  public int getSortNo() {
    return sortNo;
  }
  public void setSortNo(int sortNo) {
    this.sortNo = sortNo;
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
  
  
  
}
