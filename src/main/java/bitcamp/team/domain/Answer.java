package bitcamp.team.domain;

import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Answer {

  private int no;
  private int questionNo;
  private String content;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  
  private Question question;
  private List<AnswerFile> answerFiles;
  
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
  
  public Question getQuestion() {
    return question;
  }
  
  public void setQuestion(Question question) {
    this.question = question;
  }
  
  public List<AnswerFile> getAnswerFiles() {
    return answerFiles;
  }
  
  public void setAnswerFiles(List<AnswerFile> answerFiles) {
    this.answerFiles = answerFiles;
  }
  
  @Override
  public String toString() {
    return "Answer [no=" + no + ", questionNo=" + questionNo + ", content=" + content
        + ", createdDate=" + createdDate + ", question=" + question + ", answerFiles=" + answerFiles
        + "]";
  }
  
}
