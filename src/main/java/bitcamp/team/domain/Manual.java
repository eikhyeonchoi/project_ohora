package bitcamp.team.domain;

import java.util.List;

public class Manual {
  private int no;
  private int productNo;
  private String contents;
  private int viewCount;
  private String vLink;
  private List<ManualFile> manualFile;
  
  /*
  private List<ManualComponent> manualComponent;
  private List<ManualPrecaution> manualPrecaution;
  */
  
  public List<ManualFile> getManualFile() {
    return manualFile;
  }
  public void setManualFile(List<ManualFile> manualFile) {
    this.manualFile = manualFile;
  }
  /*
  public List<ManualComponent> getManualComponent() {
    return manualComponent;
  }
  public void setManualComponent(List<ManualComponent> manualComponent) {
    this.manualComponent = manualComponent;
  }
  public List<ManualPrecaution> getManualPrecaution() {
    return manualPrecaution;
  }
  public void setManualPrecaution(List<ManualPrecaution> manualPrecaution) {
    this.manualPrecaution = manualPrecaution;
  }
  */
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
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }
  public String getvLink() {
    return vLink;
  }
  public void setvLink(String vLink) {
    this.vLink = vLink;
  }
}
