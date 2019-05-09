// 11단계 : AbstractService 상속받기
package bitcamp.team.first.lms.dao;

import java.util.List;
import java.util.Map;
import bitcamp.team.first.lms.domain.Member;

public interface MemberDao {
  int insert(Member member);
  List<Member> findAll();
  List<Member> findByKeyword(String keyword);
  Member findByNo(int no);
  Member findByEmailPassword(Map<String,Object> paramMap);
  int update(Member member);
  int delete(int no);
  int countAll();
}
