package bitcamp.team.first.lms.service;

import java.util.List;
import bitcamp.team.first.lms.domain.Member;

public interface MemberService {
  List<Member> list();
  int add(Member member);
  Member get(int no);
  Member get(String email, String password);
  int update(Member member);
  int delete(int no);
  int size();
}
