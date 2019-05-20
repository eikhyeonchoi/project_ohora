package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Review;
import bitcamp.team.service.ReviewService;

@RestController("json/ReviewController")
@RequestMapping("/json/review")
public class ReviewController {
  
  @Autowired ReviewService reviewService;
  
  @GetMapping("list")
  public Object list() throws Exception {
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", reviewService.list());
    
    return map;
  }
  
  @GetMapping("detail")
  public Object detail(int no, @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "10") int pageSize) throws Exception {
    
    if (pageSize < 10 || pageSize > 18)
      pageSize = 10;

    int rowCount = reviewService.size(no);
    int totalPage = rowCount / pageSize;
    if (rowCount % pageSize > 0)
      totalPage++;

    if (pageNo < 1)
      pageNo = 1;
    else if (pageNo > totalPage)
      pageNo = totalPage;
    
    List<Review> review = reviewService.get(no);
    
    
    HashMap<String,Object> map = new HashMap<>();
    map.put("list", review);
    map.put("pageNo", pageNo);
    map.put("pageSize", pageSize);
    map.put("totalPage", totalPage);

    return map;
  }
  
  @GetMapping("detail2")
  public Object detail2(int no) throws Exception {
    Review review = reviewService.get2(no);
    return review;
  }
  
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (reviewService.delete(no) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } 


  @PostMapping("update")
  public Object update(Review review) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (reviewService.update(review) == 0) 
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

}
