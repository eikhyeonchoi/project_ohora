package bitcamp.team.domain;

public class ManualFile {
  private int no;
  private int manualNo;
  private int typeNo;
  private String contents;
  private String file;
  
  private ManualType manualType;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getManualNo() {
    return manualNo;
  }

  public void setManualNo(int manualNo) {
    this.manualNo = manualNo;
  }

  public int getTypeNo() {
    return typeNo;
  }

  public void setTypeNo(int typeNo) {
    this.typeNo = typeNo;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public String getFile() {
    return file;
  }

  public void setFile(String file) {
    this.file = file;
  }

  public ManualType getManualType() {
    return manualType;
  }

  public void setManualType(ManualType manualType) {
    this.manualType = manualType;
  }

  @Override
  public String toString() {
    return "ManualFile [no=" + no + ", manualNo=" + manualNo + ", typeNo=" + typeNo + ", contents="
        + contents + ", file=" + file + ", manualType=" + manualType + "]";
  }
}
