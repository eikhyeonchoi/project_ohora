package bitcamp.team.domain;

import java.io.Serializable;

public class QuestionFile implements Serializable{
  
  private static final long serialVersionUID = 1L;
  
  private int no;
  private int questionNo;
  private String filePath;
  
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
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  @Override
  public String toString() {
    return "questionFile [no=" + no + ", questionNo=" + questionNo + ", filePath=" + filePath + "]";
  }
  
}
