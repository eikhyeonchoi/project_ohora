package bitcamp.team.second.domain;

public class Faq {
  private int no;
  private String title;
  private String contents;
  private int qcNo;
  
  private QuestionCategory questionCategory;
  
  public QuestionCategory getQuestionCategory() {
    return questionCategory;
  }
  public void setQuestionCategory(QuestionCategory questionCategory) {
    this.questionCategory = questionCategory;
  }
  public int getQcNo() {
    return qcNo;
  }
  public void setQcNo(int qcNo) {
    this.qcNo = qcNo;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  
}
