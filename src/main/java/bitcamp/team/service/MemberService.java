package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Member;

public interface MemberService {
  List<Member> list();
  int add(Member member);
  Member get(int no);
  Member getEmailPassword(String email, String password);
  int getNo(String nickName);
  int authEmail(String nickName);
  int getEmail(String email);
}
