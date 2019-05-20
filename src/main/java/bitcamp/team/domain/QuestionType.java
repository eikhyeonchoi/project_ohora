package bitcamp.team.domain;
// 1:1문의 카테고리다 헷갈리지말자
// 1:1문의 카테고리다 헷갈리지말자
// 1:1문의 카테고리다 헷갈리지말자
public class QuestionType {
  
  private int no;
  private String name;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  
  @Override
  public String toString() {
    return "QuestionType [no=" + no + ", name=" + name + "]";
  }
  
}
