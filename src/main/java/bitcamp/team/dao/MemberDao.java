// 11단계 : AbstractService 상속받기
package bitcamp.team.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.domain.Member;

public interface MemberDao {
  int insert(Member member);
  List<Member> findAll();
  Member findByNo(int no);
  Member findByEmailPassword(Map<String,Object> paramMap);
  Member findNoByNickName(String nickName);
  Member findByEmail(String email);
  int updatePassword(Member member);
}
