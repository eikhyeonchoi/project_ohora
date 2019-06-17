package bitcamp.team.domain;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Fboard implements Serializable {
  private static final long serialVersionUID = 1L;

  private int no;
  private int memberNo;
  private String title;
  private String contents;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  private int viewCount;
  
  private Member member;

  public Member getMember() {
    return member;
  }
  
  public void setMember(Member member) {
    this.member = member;
  }
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
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

  @Override
  public String toString() {
    return "Fboard [no=" + no + ", memberNo=" + memberNo + ", title=" + title + ", contents="
        + contents + ", createdDate=" + createdDate + ", viewCount=" + viewCount + ", member="
        + member + "]";
  }
  
}
