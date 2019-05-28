package bitcamp.team.web.json;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Question;
import bitcamp.team.domain.QuestionFile;
import bitcamp.team.domain.QuestionType;
import bitcamp.team.service.QuestionService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/QuestionController")
@RequestMapping("/json/question")
public class QuestionController {

  String uploadDir;

  @Autowired QuestionService questionService;
  @Autowired ServletContext servletContext;

  @GetMapping("list")
  public Object list(int no) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    List<Question> questions = questionService.list(no);
    content.put("list", questions);

    return content;
  }
  
  @GetMapping("answerOkList")
  public Object answerOkList() throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    List<Question> questions = questionService.answerOkList();
    content.put("list", questions);

    return content;
  }
  
  
  @GetMapping("typeList")
  public Object typeList(int no) throws Exception {
    HashMap<String,Object> content = new HashMap<>();
    List<Question> questions = questionService.typeList(no);
    content.put("list", questions);

    return content;
  }

  @GetMapping("detail")
  public Object detail(int no) throws Exception {
    Question question = questionService.get(no);
    return question;
  }

  @GetMapping("questionList")
  public Object listQuestionType() {
    HashMap<String,Object> content = new HashMap<>();
    List<QuestionType> type = questionService.listQuestionType();
    content.put("type", type);
    return content;
  } // listManufacturer

  @RequestMapping("add")
  public Object add(Question question, @RequestParam(required = false) Part[] questionFiles, HttpSession session) {  
    this.uploadDir = servletContext.getRealPath("/upload/questionfile");
    HashMap<String,Object> content = new HashMap<>();
    ArrayList<QuestionFile> files = new ArrayList<>();

    try {
      if (question.getTitle().equals("")) {
        throw new Exception("제목을 입력하세요.");
      } else if (question.getContents().equals("")) {
        throw new Exception("내용을 입력하세요.");
      } else {
        if (questionFiles != null) {
          for (Part part : questionFiles) {
            String filename = UUID.randomUUID().toString();
            String filepath = uploadDir + "/" + filename; 
            part.write(filepath);

            QuestionFile questionFile = new QuestionFile();
            questionFile.setFilePath(filename);
            files.add(questionFile);
          } // for(Part)
          question.setQuestionFiles(files);
        } // if(파일 올릴때)
        Member loginUser = (Member)session.getAttribute("loginUser");
        question.setMemberNo(loginUser.getNo());
        questionService.add(question);
        content.put("status", "success");
      } // else(오류 안났을때)
    } catch (Exception e) {
      content.put("status","fail");
      content.put("error",e.getMessage());
    }
    return content;
  } // add

  @GetMapping("files")
  public Object files(int no) {
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Question files = questionService.getFile(no);
      contents.put("files", files);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }


  @GetMapping("delete")
  public Object delete(int no, String status) {    
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (questionService.delete(no, status) == 0)
        throw new Exception("삭제중 오류가 발생했습니다.");

      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  };


}