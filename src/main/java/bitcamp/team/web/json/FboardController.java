package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;
import bitcamp.team.service.FboardService;
import bitcamp.team.service.MemberService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/FboardController")
@RequestMapping("/json/fboard")
public class FboardController {

  @Autowired FboardService boardService;
  @Autowired MemberService memberService;

  @PostMapping("add")
  public Object add(Fboard board) throws Exception {
    // 자게 글쓸때 작성자 이름을 남기기위해 HttpServletRequest를 사용한다.

    HashMap<String,Object> content = new HashMap<>();
    try {
      System.out.println(board);
      boardService.add(board);

      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Fboard board = boardService.get(no);
    return board;
  }

  @GetMapping("delete")
  public Object delete(int no) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (boardService.delete(no) == 0)
        throw new RuntimeException("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @GetMapping("list")
  public Object list(
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "10") int pageSize,
      @RequestParam(defaultValue = "undefined" ,required = false) String search) throws Exception {
    HashMap<String,Object> param = new HashMap<>();
    HashMap<String,Object> content = new HashMap<>();
    
    int rowCount = boardService.size();
    int totalPage = rowCount / pageSize;
    if(rowCount % pageSize > 0) {
      totalPage++;
    }
    
    param.put("pageNo", (pageNo - 1) * pageSize);
    param.put("size", pageSize);
    
    
    content.put("pageNo", pageNo);
    content.put("totalPage", totalPage);
    content.put("rowCount", rowCount);
    content.put("pageSize", pageSize);
    
    if(!search.equals("undefined")) {
      if (search.contains("t.")) {
        param.put("title", search.substring(2));
      } else if (search.contains("c.")) {
        param.put("contents", search.substring(2));
      } else if(search.contains("n.")){
        param.put("nickName", search.substring(2));
      }
    }
    
    List<Fboard> boards = boardService.list(param);
    content.put("list", boards);

    return content;
  }

  
  
  
  @PostMapping("update")
  public Object update(Fboard board) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (boardService.update(board) == 0) 
        throw new Exception("해당 번호의 게시물이 없습니다.");
      content.put("status", "success");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  }

  @GetMapping("commentList")
  public Object commentList(int no) throws Exception {
    return boardService.commentList(no);
  }

  @PostMapping("addComment")
  public Object addComment(FboardComment comment) {
    HashMap<String,Object> content = new HashMap<>();

    try {
      
      if (boardService.addComment(comment) == 0) 
        throw new Exception("저장 실패");
      else {
        content.put("status", "success");
        content.put("fboardNo", comment.getNo());
      }
    } catch(Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }

  @GetMapping("deleteComment")
  public Object deleteComment(int no) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (boardService.deleteComment(no) == 0)
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
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("no",no);
    paramMap.put("contents",contents);
    paramMap.put("updateDate",updateDate);
    
    try {
      if (boardService.updateComment(paramMap) == 0) 
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
    HashMap<String,Object> content = new HashMap<>();
    HashMap<String,Object> param = new HashMap<>();
    
    param.put("fboardNo", fboardNo);
    param.put("parentNo", parentNo);
    
    content.put("replyList", boardService.findReply(param));
    return content;
  }



}