package bitcamp.team.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Tip {
  private int no;
  private String contents;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date createdDate;
  private int productNo;
  private int memberNo;
  
  private Product product;
  private Member member;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  public int getProductNo() {
    return productNo;
  }
  public void setProductNo(int productNo) {
    this.productNo = productNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public Product getProduct() {
    return product;
  }
  public void setProduct(Product product) {
    this.product = product;
  }
  public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
  }
  @Override
  public String toString() {
    return "Tip [no=" + no + ", contents=" + contents + ", createdDate=" + createdDate
        + ", productNo=" + productNo + ", memberNo=" + memberNo + ", product=" + product
        + ", member=" + member + "]";
  }


}
