package bitcamp.team.web.json;

import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Review;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.ReviewService;

@RestController("json/ReviewController")
@RequestMapping("/json/review")
public class ReviewController {

  ReviewService reviewService;
  ProductService productService;

  public ReviewController(ReviewService reviewService, ProductService productService) {
    this.reviewService = reviewService;
    this.productService = productService;
  }

  @GetMapping("list")
  public Object list(String keyword) throws Exception {
    HashMap<String, Object> contents = new HashMap<>();
    List<Review> list = reviewService.list(keyword);

    contents.put("list", list);
    contents.put("keyword", keyword);

    return contents;
  }

  @GetMapping("detail")
  public Object detail(int no, String keyword, String searchType) throws Exception {
    List<Review> review = reviewService.get(no, keyword, searchType);

    HashMap<String, Object> map = new HashMap<>();
    try {
      map.put("list", review);
      map.put("status", "success");
    } catch (Exception e) {
      map.put("status", "fail");
      map.put("error", e.getMessage());

    }
    return map;
  }

  @GetMapping("detail2")
  public Object detail2(int no) throws Exception {
    Review review = reviewService.get2(no);
    return review;
  }

  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String, Object> content = new HashMap<>();
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

  @RequestMapping("add")
  public Object add(Review review) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (review.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");

      } else if (review.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }

      if (review.getTitle().length() > 40) {
        throw new RuntimeException("제목 길이는 40자 까지 가능합니다");
      }

      reviewService.add(review);
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }


  @PostMapping("update")
  public Object update(Review review) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (review.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (review.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }

      if (review.getTitle().length() > 40) {
        throw new RuntimeException("제목 길이는 40자 까지 가능합니다");
      }

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
