package bitcamp.team.domain;

public class QuestionFile {

  private int no;
  private int questionNo;
  private String filePath;

  private Question question;

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

  public Question getQuestion() {
    return question;
  }
  public void setQuestion(Question question) {
    this.question = question;
  }
  @Override
  public String toString() {
    return "QuestionFile [no=" + no + ", questionNo=" + questionNo + ", filePath=" + filePath
        + ", question=" + question + "]";
  }


}
