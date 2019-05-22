package bitcamp.team.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Answer {

  private int no;
  private int questionNo;
  private String content;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getQuestionNo() {
    return questionNo;
  }
  public void setQuestionNo(int questionNo) {
    this.questionNo = questionNo;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }
  
  @Override
  public String toString() {
    return "Answer [no=" + no + ", questionNo=" + questionNo + ", content=" + content
        + ", createdDate=" + createdDate + "]";
  }
  
}
