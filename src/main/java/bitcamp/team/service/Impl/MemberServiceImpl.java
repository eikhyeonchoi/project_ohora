package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.MemberDao;
import bitcamp.team.domain.Member;
import bitcamp.team.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {

  MemberDao memberDao;

  public MemberServiceImpl(MemberDao memberDao) {
    this.memberDao = memberDao;
  }

  @Override
  public List<Member> list() {
    System.out.println(memberDao.findAll());
    return memberDao.findAll();
  }

  @Override
  public int add(Member member) {
    return memberDao.insert(member);
  }

  @Override
  public Member get(int no) {
    return memberDao.findByNo(no);
  }

  @Override
  public List<Member> getList(String nickName) {
    List<Member> members = memberDao.findNoByNickNameList(nickName);
    return members;
  }
  
  @Override
  public int getNo(String nickName) {
    Member member = memberDao.findNoByNickName(nickName);
    return member.getNo();
  }

  @Override
  public int get2(String nickName) {
    Member member = memberDao.findNoByNickName2(nickName);
    if (member == null) {
      return 0;
    } else {
      return member.getNo();
    }
  }

  @Override
  public int get3(String email) {
    Member member = memberDao.findByEmail(email);
    if (member == null) {
      return 0;
    } else {
      return member.getNo();
    }
  }

  @Override
  public int update(Member member) {
    return memberDao.update(member);
  }

  @Override
  public int delete(int no) {
    return memberDao.delete(no);
  }
  
  @Override
  public int delete(String email) {
    return memberDao.deleteCompany(email);
  }

  @Override
  public Member get(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return memberDao.findByEmailPassword(paramMap);
  }

  @Override
  public int size() {
    return memberDao.countAll();
  }

}