package bitcamp.team.domain;

import java.util.List;

public class Product {
  private int no;
  private int smallCategoryNo;
  private int manufacturerNo;
  private String name;

  private Manufacturer manufacturer;
  private ProductSmallCategory productSmallCategory;
  private List<ProductFile> productFiles;
  
  private Tip tip;
  
  @Override
  public String toString() {
    return "Product [no=" + no + ", smallCategoryNo=" + smallCategoryNo + ", manufacturerNo="
        + manufacturerNo + ", name=" + name + ", manufacturer=" + manufacturer
        + ", productSmallCategory=" + productSmallCategory + ", productFiles=" + productFiles + "]";
  }
  public Tip getTip() {
    return tip;
  }

  public void setTip(Tip tip) {
    this.tip = tip;
  }

  public List<ProductFile> getProductFiles() {
    return productFiles;
  }

  public void setProductFiles(List<ProductFile> productFiles) {
    this.productFiles = productFiles;
  }

  public int getNo() {
    return no;
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


  public void setNo(int no) {
    this.no = no;
  }
}
