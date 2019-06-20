package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Fboard;
import bitcamp.team.domain.FboardComment;
import bitcamp.team.domain.Member;
import bitcamp.team.service.FboardService;
import bitcamp.team.service.MemberService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/FboardController")
@RequestMapping("/json/fboard")
public class FboardController {

  @Autowired FboardService boardService;
  @Autowired MemberService memberService;
  @Autowired ServletContext servletContext;
  @Autowired HttpSession httpSession;

  @RequestMapping("add")
  public Object add(Fboard board) throws Exception {
    Member member = (Member) httpSession.getAttribute("loginUser");
    board.setMemberNo(member.getNo());

    HashMap<String,Object> content = new HashMap<>();
    try {
      if (board.getTitle() == "")
        throw new Exception("제목을 입력하세요");

      if (board.getContents() == "")
        throw new Exception("내용을 입력하세요");

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
    HashMap<String, Object> content = new HashMap<>();
    content.put("board",  boardService.get(no));
    return content;
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
      @RequestParam(defaultValue = "undefined" ,required = false) String type,
      @RequestParam(defaultValue = "undefined" ,required = false) String keyword) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    HashMap<String,Object> content = new HashMap<>();

    if(!type.equals("undefined") && !type.equals("undefined")) {
      if (type == "title") {
        paramMap.put("title", keyword);
        
      } else if (type == "contents") {
        paramMap.put("contents", keyword);
        
      } else {
        paramMap.put("all", keyword);
        
      }
    }
    
    List<Fboard> boards = boardService.list(paramMap);
    content.put("list", boards);

    return content;
  }

  @GetMapping("myPost")
  public Object myPost(int no) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    System.out.println(no);
    List<Fboard> boards = boardService.findMyPost(no);
    content.put("list", boards);
    return content;
  }

  @PostMapping("update")
  public Object update(Fboard board) throws Exception {
    HashMap<String,Object> content = new HashMap<>();

    Member member = (Member) httpSession.getAttribute("loginUser");
    board.setMemberNo(member.getNo());

    try {
      if (board.getTitle() == "")
        throw new Exception("제목을 입력하세요");

      if (board.getContents() == "")
        throw new Exception("내용을 입력하세요");


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

    Member member = (Member) httpSession.getAttribute("loginUser");
    comment.setMemberNo(member.getNo());

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






