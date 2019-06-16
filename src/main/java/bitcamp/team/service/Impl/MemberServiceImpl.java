package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
  public int getNo(String nickName) {
    Member member = memberDao.findNoByNickName(nickName);
    return member.getNo();
  }

  @Override
  public int authEmail(String nickName) {
    Member member = memberDao.findNoByNickName(nickName);
    if (member == null) {
      return 0;
    } else {
      return member.getNo();
    }
  }

  @Override
  public int getEmail(String email) {
    Member member = memberDao.findByEmail(email);
    if (member == null) {
      return 0;
    } else {
      return member.getNo();
    }
  }

  @Override
  public Member getEmailPassword(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return memberDao.findByEmailPassword(paramMap);
  }

  @Override
  public Member getEmail2(String email) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);

    return memberDao.findByEmail2(paramMap);
  }

  @Override
  public int updatePassword(HashMap<String,Object> param) {
    return memberDao.updatePassword(param);
  }


  @Override
  public int updatePassword2(String email, String password) {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    return memberDao.updatePassword2(paramMap);
  }
  
  @Override
  public int updateName(Member member) {
    return memberDao.updateName(member);
  }

  @Override
  public int updateNickname(Member member) {
    return memberDao.updateNickname(member);
  }

  @Override
  public int updateTel(Member member) {
    return memberDao.updateTel(member);
  }

  @Override
  public int updatePhoto(Member member) {
    return memberDao.updatePhoto(member);
  }

  @Override
  public int deletePhoto(int no) {
    return memberDao.deletePhoto(no);
  }

  @Override
  public Member findByNameEmail(Member member) {
    return memberDao.findByNameEmail(member);
  }

  @Override
  public int updateDeleteMember(Map<String, Object> map) {
    return memberDao.updateDeleteMember(map);
  }
  
}