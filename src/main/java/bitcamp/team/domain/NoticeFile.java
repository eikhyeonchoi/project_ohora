package bitcamp.team.domain;

public class NoticeFile {
  private int no;
  private int noticeNo;
  private String filename;
  private long filesize;
  private Notice notice;

  @Override
  public String toString() {
    return "NoticeFile [no=" + no + ", noticeNo=" + noticeNo + ", filename=" + filename
        + ", filesize=" + filesize + ", notice=" + notice + "]";
  }

  public Notice getNotice() {
    return notice;
  }

  public void setNotice(Notice notice) {
    this.notice = notice;
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

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  public long getFilesize() {
    return filesize;
  }

  public void setFilesize(long filesize) {
    this.filesize = filesize;
  }


}
