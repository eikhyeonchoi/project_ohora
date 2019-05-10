package bitcamp.team.web.json;

import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.service.CommentService;

@RestController("json/CommentController")
@RequestMapping("/json/comment")
public class CommentController {
  
  CommentService commentService;
  
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }
  
  
  @GetMapping("list")
  public Object list() {
    HashMap<String, Object> content = new HashMap<>();
    content.put("list", commentService.list());
    return content;
  } // list


}
