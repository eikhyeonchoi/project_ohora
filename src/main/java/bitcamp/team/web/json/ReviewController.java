package bitcamp.team.web.json;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.Review;
import bitcamp.team.domain.ReviewComment;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.ReviewService;
import bitcamp.team.service.SatisfyService;

@RestController("json/ReviewController")
@RequestMapping("/json/review")
public class ReviewController {

  ReviewService reviewService;
  SatisfyService satisfyService;
  ProductService productService;
  HttpSession httpSession;

  public ReviewController(ReviewService reviewService, SatisfyService satisfyService,
      ProductService productService, HttpSession httpSession) {
    this.reviewService = reviewService;
    this.satisfyService = satisfyService;
    this.productService = productService;
    this.httpSession = httpSession;
  }

  @GetMapping("list")
  public Object list(int largeNo, int smallNo, String keyword, String listType) throws Exception {
    HashMap<String, Object> contents = new HashMap<>();
    List<Product> list = productService.list2(largeNo, smallNo, keyword, listType);

    if (listType.contains("many")) {
      for (Product p : list) {
        p.setReviewCount(reviewService.countByProdNo(p.getNo()));
      }
      ArrayList<Product> pList = (ArrayList<Product>) quickSort(list, 0, list.size() - 1);
      Collections.reverse(pList);
      contents.put("list", pList);
    } else {
      contents.put("list", list);
    }
    contents.put("keyword", keyword);

    return contents;
  }

  @GetMapping("detail")
  public Object detail(int no, String keyword, String searchType) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    List<Review> review = reviewService.get(no, keyword, searchType);
    Product product = productService.get(no);
    Map<String, Object> satisfy = satisfyService.get(no);

    try {
      map.put("list", review);
      map.put("satisfy", satisfy);
      map.put("product", product);
      map.put("status", "success");
    } catch (Exception e) {
      map.put("status", "fail");
      map.put("error", e.getMessage());

    }
    return map;
  }

  @GetMapping("detail2")
  public Object detail2(int no) throws Exception {
    HashMap<String, Object> contents = new HashMap<>();

    Review review = reviewService.get2(no);

    try {
      contents.put("review", review);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());

    }
    return review;
  }

  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      Review review = reviewService.get2(no);
      Member member = (Member) httpSession.getAttribute("loginUser");
      System.out.println(review.getMemberNo() != member.getNo());
      System.out.println(review.getMemberNo());
      System.out.println(member.getNo());

      if (review.getMemberNo() != member.getNo() && Integer.parseInt(member.getType()) != 3) {
        throw new RuntimeException("해당 글을 쓴 회원만 지울 수 있습니다.");
      }
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
      Member member = (Member) httpSession.getAttribute("loginUser");
      review.setMemberNo(member.getNo());

      if (member.getNo() == 0) {
        throw new RuntimeException("글을 쓸 권한이 없습니다.\n로그인 후 등록해주세요");
      }

      if (review.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (review.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }

      if (review.getTitle().length() > 40) {
        throw new RuntimeException("제목 길이는 40자 까지 가능합니다");
      }

      List<Review> list = reviewService.get(review.getProductNo(), "", "");
      System.out.println(list.size() + "**");
      if (list.size() == 0) {
        System.out.println("11");
        review.setrNo(1);
      } else {
        review.setrNo((list.get(list.size() - 1).getrNo()) + 1);
        System.out.println(list.get(list.size() - 1).toString());
      }
      System.out.println(review.toString());
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
      Member member = (Member) httpSession.getAttribute("loginUser");
      if (review.getTitle() == "") {
        throw new RuntimeException("제목을 입력해 주세요");
      } else if (review.getContents() == "") {
        throw new RuntimeException("내용을 입력해 주세요");
      }
      if (review.getMemberNo() != member.getNo()) {
        throw new RuntimeException("해당 글을 쓴 회원만 수정 할 수 있습니다.");
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

  // quick sort(리뷰 많은 순)
  public static List<Product> quickSort(List<Product> arr, int start, int end) {
    int partition = partition(arr, start, end);
    if (partition - 1 > start) {
      quickSort(arr, start, partition - 1);
    }
    if (partition + 1 < end) {
      quickSort(arr, partition + 1, end);
    }
    return arr;
  }

  public static int partition(List<Product> arr, int start, int end) {
    int pivot = arr.get(end).getReviewCount();
    for (int i = start; i < end; i++) {
      if (arr.get(i).getReviewCount() < pivot) {
        Product temp = arr.get(start);
        arr.set(start, arr.get(i));
        arr.set(i, temp);
        start++;
      }
    }
    Product temp = arr.get(start);
    arr.set(start, arr.get(end));
    arr.set(end, temp);
    return start;
  }

  // 마이페이지 리뷰 찾기
  @GetMapping("findMyPageReview")
  public Object findMyPageReview(int memberNo) throws Exception {
    HashMap<String, Object> contents = new HashMap<>();

    try {
      List<Review> list = reviewService.findMyPageReview(memberNo);
      contents.put("list", list);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  // 댓글
  @GetMapping("commentList")
  public Object commentList(int no) throws Exception {
    return reviewService.commentList(no);
  }

  @PostMapping("addComment")
  public Object addComment(ReviewComment comment) {
    HashMap<String, Object> content = new HashMap<>();

    Member member = (Member) httpSession.getAttribute("loginUser");
    comment.setMemberNo(member.getNo());

    try {

      if (reviewService.addComment(comment) == 0)
        throw new Exception("저장 실패");
      else {
        content.put("status", "success");
        content.put("detailNo", comment.getNo());
      }
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("deleteComment")
  public Object deleteComment(int no) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (reviewService.deleteComment(no) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @PostMapping("updateComment")
  public Object updateComment(int no, String contents, String updateDate) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    HashMap<String, Object> paramMap = new HashMap<>();
    paramMap.put("no", no);
    paramMap.put("contents", contents);
    paramMap.put("updateDate", updateDate);

    try {
      if (reviewService.updateComment(paramMap) == 0)
        throw new Exception("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @GetMapping("findReply")
  public Object findReply(int fboardNo, int parentNo) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    HashMap<String, Object> param = new HashMap<>();

    param.put("fboardNo", fboardNo);
    param.put("parentNo", parentNo);

    content.put("replyList", reviewService.findReply(param));
    return content;
  }



}
