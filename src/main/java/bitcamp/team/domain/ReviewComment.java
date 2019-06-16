package bitcamp.team.domain;

public class ReviewComment {
  private int no;
  private int memberNo;
  private int reviewNo;
  private String contents;
  private String createdDate;
  private int depth;
  private int parentId;
  
  private Member member;

@Override
public String toString() {
	return "ReviewComment [no=" + no + ", memberNo=" + memberNo + ", reviewNo=" + reviewNo + ", contents=" + contents
			+ ", createdDate=" + createdDate + ", depth=" + depth + ", parentId=" + parentId + ", member=" + member
			+ "]";
}

public int getNo() {
	return no;
}

public void setNo(int no) {
	this.no = no;
}

public int getMemberNo() {
	return memberNo;
}

public void setMemberNo(int memberNo) {
	this.memberNo = memberNo;
}

public int getreviewNo() {
	return reviewNo;
}

public void setreviewNo(int reviewNo) {
	this.reviewNo = reviewNo;
}

public String getContents() {
	return contents;
}

public void setContents(String contents) {
	this.contents = contents;
}

public String getCreatedDate() {
	return createdDate;
}

public void setCreatedDate(String createdDate) {
	this.createdDate = createdDate;
}

public int getDepth() {
	return depth;
}

public void setDepth(int depth) {
	this.depth = depth;
}

public int getParentId() {
	return parentId;
}

public void setParentId(int parentId) {
	this.parentId = parentId;
}

public Member getMember() {
	return member;
}

public void setMember(Member member) {
	this.member = member;
}
  
  
  
}
