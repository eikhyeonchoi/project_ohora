package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Member;

public interface MemberService {
  List<Member> list();
  int add(Member member);
  Member get(int no);
  Member get(String email, String password);
  int update(Member member);
  int delete(int no);
  int getNo(String nickName);
  List<Member> getList(String nickName);
  int get2(String nickName);
  int get3(String email);
  int size();
  int delete(String email);
}
