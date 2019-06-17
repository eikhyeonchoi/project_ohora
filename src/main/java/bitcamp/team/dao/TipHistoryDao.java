package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.TipHistory;

public interface TipHistoryDao {
   List<TipHistory> findByNo(int no);
   TipHistory findContsByNo(int no);
   int delete(int no);
   int insert(TipHistory tip);
   int update(TipHistory tip);
   int deleteByTipNo(int no);
}

