package bitcamp.team.domain;

public class Satisfy {
  private int no;
  private int pdNo;
  private int mNo;
  private double level;
  private double understand;
  private double design;
  private double asStf;
  private double useful;
  private double priceStf;
  private String eval;
  
  
  
  public String getEval() {
    return eval;
  }
  public void setEval(String eval) {
    this.eval = eval;
  }
  private Product product;
  private Member member;
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getPdNo() {
    return pdNo;
  }
  public void setPdNo(int pdNo) {
    this.pdNo = pdNo;
  }
  public int getmNo() {
    return mNo;
  }
  public void setmNo(int mNo) {
    this.mNo = mNo;
  }
  public double getLevel() {
    return level;
  }
  public void setLevel(double level) {
    this.level = level;
  }
  public double getUnderstand() {
    return understand;
  }
  public void setUnderstand(double understand) {
    this.understand = understand;
  }
  public double getDesign() {
    return design;
  }
  public void setDesign(double design) {
    this.design = design;
  }
  public double getAsStf() {
    return asStf;
  }
  public void setAsStf(double asStf) {
    this.asStf = asStf;
  }
  public double getUseful() {
    return useful;
  }
  public void setUseful(double useful) {
    this.useful = useful;
  }
  public double getPriceStf() {
    return priceStf;
  }
  public void setPriceStf(double priceStf) {
    this.priceStf = priceStf;
  }
  public Product getProduct() {
    return product;
  }
  public void setProduct(Product product) {
    this.product = product;
  }
  public Member getMember() {
    return member;
  }
  public void setMember(Member member) {
    this.member = member;
  }

  
}

