package bitcamp.team.domain;

public class NoticeFile {
  private int no;
  private int noticeNo;
  private String filePath;

  @Override
  public String toString() {
    return "NoticeFile [no=" + no + ", noticeNo=" + noticeNo + ", filePath=" + filePath + "]";
  }

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getNoticeNo() {
    return noticeNo;
  }

  public void setNoticeNo(int noticeNo) {
    this.noticeNo = noticeNo;
  }

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }


}
