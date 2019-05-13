package bitcamp.team.domain;

public class Product {
  private int no;
  private int smallCategoryNo;
  private int manufacturerNo;
  private String name;
  
  private Manufacturer manufacturer;
  private ProductSmallCategory productSmallCategory;
  
  
  public Manufacturer getManufacturer() {
    return manufacturer;
  }
  public void setManufacturer(Manufacturer manufacturer) {
    this.manufacturer = manufacturer;
  }
  public ProductSmallCategory getProductSmallCategory() {
    return productSmallCategory;
  }
  public void setProductSmallCategory(ProductSmallCategory productSmallCategory) {
    this.productSmallCategory = productSmallCategory;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getSmallCategoryNo() {
    return smallCategoryNo;
  }
  public void setSmallCategoryNo(int smallCategoryNo) {
    this.smallCategoryNo = smallCategoryNo;
  }
  public int getManufacturerNo() {
    return manufacturerNo;
  }
  public void setManufacturerNo(int manufacturerNo) {
    this.manufacturerNo = manufacturerNo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  
  private int sctgNo;
  private int manufacNo;
  private String name;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getSctgNo() {
    return sctgNo;
  }
  public void setSctgNo(int sctgNo) {
    this.sctgNo = sctgNo;
  }
  public int getManufacNo() {
    return manufacNo;
  }
  public void setManufacNo(int manufacNo) {
    this.manufacNo = manufacNo;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  
  
}
