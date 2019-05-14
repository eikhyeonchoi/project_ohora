package bitcamp.team.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

public class TipHistory {
  private int no;
  private String contents;
  private int tipNo;
  @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
  private Date updateDate;
  private String nickName;
  
  private Tip tip;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getContents() {
    return contents;
  }

  public void setContents(String contents) {
    this.contents = contents;
  }

  public int getTipNo() {
    return tipNo;
  }

  public void setTipNo(int tipNo) {
    this.tipNo = tipNo;
  }

  public Date getUpdateDate() {
    return updateDate;
  }

  public void setUpdateDate(Date updateDate) {
    this.updateDate = updateDate;
  }

  public String getNickName() {
    return nickName;
  }

  public void setNickName(String nickName) {
    this.nickName = nickName;
  }

  public Tip getTip() {
    return tip;
  }

  public void setTip(Tip tip) {
    this.tip = tip;
  }

  @Override
  public String toString() {
    return "TipHistory [no=" + no + ", contents=" + contents + ", tipNo=" + tipNo + ", updateDate="
        + updateDate + ", nickName=" + nickName + ", tip=" + tip + "]";
  }
}
