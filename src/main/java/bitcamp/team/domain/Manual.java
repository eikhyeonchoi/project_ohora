package bitcamp.team.domain;

import java.util.List;

public class Manual {
  private int no;
  private int productNo;
  private int viewCount;
  private String name;

  private Product product;
  private Manufacturer manufacturer;
  private List<ManualFile> manualFile;
  private List<ProductFile> productFile;
  
  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public Manufacturer getManufacturer() {
    return manufacturer;
  }

  public void setManufacturer(Manufacturer manufacturer) {
    this.manufacturer = manufacturer;
  }

  public List<ProductFile> getProductFile() {
    return productFile;
  }

  public void setProductFile(List<ProductFile> productFile) {
    this.productFile = productFile;
  }

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

  public int getViewCount() {
    return viewCount;
  }

  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<ManualFile> getManualFile() {
    return manualFile;
  }

  public void setManualFile(List<ManualFile> manualFile) {
    this.manualFile = manualFile;
  }

  @Override
  public String toString() {
    return "Manual [no=" + no + ", productNo=" + productNo + ", viewCount=" + viewCount + ", name="
        + name + ", product=" + product + ", manufacturer=" + manufacturer + ", manualFile="
        + manualFile + ", productFile=" + productFile + "]";
  }
}
