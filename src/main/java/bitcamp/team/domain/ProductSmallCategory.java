package bitcamp.team.domain;

public class ProductSmallCategory {
  private int no;
  private int largeCategoryNo;
  private String name;
  
  private ProductLargeCategory productLargeCategory;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getLargeCategoryNo() {
    return largeCategoryNo;
  }
  public void setLargeCategoryNo(int largeCategoryNo) {
    this.largeCategoryNo = largeCategoryNo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public ProductLargeCategory getProductLargeCategory() {
    return productLargeCategory;
  }
  public void setProductLargeCategory(ProductLargeCategory productLargeCategory) {
    this.productLargeCategory = productLargeCategory;
  }
  
  
  
  
}
