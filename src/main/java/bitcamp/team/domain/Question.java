package bitcamp.team.domain;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Question {

  private int no;
  private int questionNo;
  private int memberNo;
  private String title;
  private String contents;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  private String status;
  
  private QuestionType questionType;
  private Member member;
  private Answer answer;
  
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
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public QuestionType getQuestionType() {
    return questionType;
  }
  public void setQuestionType(QuestionType questionType) {
    this.questionType = questionType;
  }
  public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
  }
  
  public Answer getAnswer() {
    return answer;
  }
  public void setAnswer(Answer answer) {
    this.answer = answer;
  }
  
  @Override
  public String toString() {
    return "Question [no=" + no + ", questionNo=" + questionNo + ", memberNo=" + memberNo
        + ", title=" + title + ", contents=" + contents + ", createdDate=" + createdDate
        + ", status=" + status + ", questionType=" + questionType + ", member=" + member
        + ", answer=" + answer + "]";
  }

}


