package bitcamp.team.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Member;

public interface MemberService {
  List<Member> list();
  int add(Member member);
  Member get(int no);
  Member getEmailPassword(String email, String password);
  Member getEmail2(String email);
  Member findByNameEmail(Member member);
  int getNo(String nickName);
  int authEmail(String nickName);
  int getEmail(String email);
  int updatePassword(HashMap<String,Object> param);
  int updatePassword2(String email, String password);
  int updateName(Member member);
  int updateNickname(Member member);
  int updateTel(Member member);
  int updatePhoto(Member member);
  int updateDeleteMember(Map<String, Object> map);
  int deletePhoto(int no);
  int authFacebook(Map<String, Object> fbMap);
  int authUpdateFacebook(Map<String, Object> fbMap);

}
