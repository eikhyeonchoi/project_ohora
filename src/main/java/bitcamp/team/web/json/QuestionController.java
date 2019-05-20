package bitcamp.team.web.json;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Question;
import bitcamp.team.service.QuestionService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/QuestionController")
@RequestMapping("/json/question")
public class QuestionController {

  @Autowired QuestionService questionService;

  @GetMapping("list")
  public Object list() throws Exception {
    List<Question> questions = questionService.list();
    HashMap<String,Object> content = new HashMap<>();
    System.out.println(questions);
    content.put("list", questions);

    return content;
  }

}