package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Fboard;
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
  public Object list() throws Exception {
    List<Fboard> boards = boardService.list();
    HashMap<String,Object> map = new HashMap<>();
    System.out.println(boards);
    map.put("list", boards);

    return map;
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
}