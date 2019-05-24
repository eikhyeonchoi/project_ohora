package bitcamp.team.web.json;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Answer;
import bitcamp.team.domain.AnswerFile;
import bitcamp.team.service.AnswerService;


// AJAX 기반 JSON 데이터를 다루는 컨트롤러
@RestController("json/AnswerController")
@RequestMapping("/json/answer")
public class AnswerController {

  String uploadDir;

  //  @Autowired AnswerService answerService;
  @Autowired ServletContext servletContext;
  @Autowired AnswerService answerService;


  @RequestMapping("add")
  public Object add(Answer answer, @RequestParam(required = false) Part[] answerFiles) {
    this.uploadDir = servletContext.getRealPath("/upload/answerfile");
    HashMap<String,Object> content = new HashMap<>();
    ArrayList<AnswerFile> files = new ArrayList<>();

    try {
      if (answer.getContent().equals("")) {
        throw new Exception("답변을 입력하세요.");
      } else {
        if (answerFiles != null) {
          for (Part part : answerFiles) {
            String filename = UUID.randomUUID().toString();
            String filepath = uploadDir + "/" + filename; 
            part.write(filepath);

            AnswerFile answerFile = new AnswerFile();
            answerFile.setFilePath(filename);
            files.add(answerFile);
          } // for(Part)
          answer.setAnswerFiles(files);
        } // if(파일 올릴때)
        answerService.add(answer);
        content.put("status", "success");
      } // else(오류 안났을때)
    } catch (Exception e) {
      content.put("status","fail");
      content.put("error",e.getMessage());
    }
    return content;
  } // add

  //  @GetMapping("files")
  //  public Object files(int no) {
  //    HashMap<String,Object> contents = new HashMap<>();
  //    try {
  //      Question files = questionService.getFile(no);
  //      contents.put("files", files);
  //      contents.put("status", "success");
  //    } catch (Exception e) {
  //      contents.put("status", "fail");
  //      contents.put("error", e.getMessage());
  //    }
  //    return contents;
  //  }


}