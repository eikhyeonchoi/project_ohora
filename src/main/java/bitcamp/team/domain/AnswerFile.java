package bitcamp.team.domain;

public class AnswerFile {

  private int no;
  private int answerNo;
  private String filePath;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getAnswerNo() {
    return answerNo;
  }
  public void setAnswerNo(int answerNo) {
    this.answerNo = answerNo;
  }
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  
  @Override
  public String toString() {
    return "AnswerFile [no=" + no + ", answerNo=" + answerNo + ", filePath=" + filePath + "]";
  }
  
}
