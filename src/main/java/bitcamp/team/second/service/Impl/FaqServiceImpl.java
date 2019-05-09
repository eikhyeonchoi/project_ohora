package bitcamp.team.second.service.Impl;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.second.dao.FaqDao;
import bitcamp.team.second.domain.Faq;
import bitcamp.team.second.service.FaqService;

@Service
public class FaqServiceImpl implements FaqService {
  
  FaqDao faqDao;
  public FaqServiceImpl(FaqDao faqDao) {
    this.faqDao = faqDao;
  }
  
  @Override
  public Map<String, Object> list() {
    HashMap<String, Object> ctgAndList = new HashMap<>();
    ctgAndList.put("faqCtg", faqDao.findCategoryName());
    ctgAndList.put("list", faqDao.findAll());
    
    return ctgAndList;
  }

  @Override
  public Faq get(int no) {
    return faqDao.findByNo(no);
  }

  @Override
  public int add(Faq faq) {
    return faqDao.insert(faq);
  }

  @Override
  public int delete(int no) {
    return faqDao.delete(no);
  }

  @Override
  public int update(Faq faq) {
    return faqDao.update(faq);
  }

}
