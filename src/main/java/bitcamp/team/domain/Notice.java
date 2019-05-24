package bitcamp.team.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

public class Notice implements Cloneable, Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  protected String title;
  protected String contents;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  protected Date createdDate;
  protected int viewCount;
  protected List<NoticeFile> files;

  @Override
  public Notice clone() throws CloneNotSupportedException {
    return (Notice) super.clone();
  }

  @Override
  public String toString() {
    return "Notice [no=" + no + ", title=" + title + ", contents=" + contents + ", createdDate="
        + createdDate + ", viewCount=" + viewCount + ", files=" + files + "]";
  }


  public List<NoticeFile> getFiles() {
    return files;
  }


  public void setFiles(List<NoticeFile> files) {
    this.files = files;
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

  public Date getCreatedDate() {
    return createdDate;
  }

  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
  }

  public int getViewCount() {
    return viewCount;
  }

  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

}
