package bitcamp.team.domain;

import java.io.Serializable;

public class ProductFile implements Serializable{
  
  private static final long serialVersionUID = 1L;
  
  private int no;
  private int productNo;
  private String img;
 
  private Product product;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getProductNo() {
    return productNo;
  }

  public void setProductNo(int productNo) {
    this.productNo = productNo;
  }

  public String getImg() {
    return img;
  }

  public void setImg(String img) {
    this.img = img;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  @Override
  public String toString() {
    return "ProductFile [no=" + no + ", productNo=" + productNo + ", img=" + img + ", product="
        + product + "]";
  }
}
