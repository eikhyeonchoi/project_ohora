package bitcamp.team.web.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.service.ManualService;

@RestController("json/ManualController")
@RequestMapping("/json/manual")
public class ManualController {

  ManualService manualService;
  ServletContext servletContext;

  public ManualController(
      ManualService manualService, 
      ServletContext servletContext) {
    this.manualService = manualService;
    this.servletContext = servletContext;
  }
  
  @RequestMapping("add")
  public Object add(Manual manual, Part[] img, int type) throws Exception {
    HashMap<String, Object> content = new HashMap<>();
    
    ArrayList<ManualFile> files = new ArrayList<>();
    String uploadDir = servletContext.getRealPath("/upload/manualfile");
    
    for (Part part : img) {
      if (part.getSize() == 0) {
        continue;
      }
      
      String filename = UUID.randomUUID().toString();
      part.write(uploadDir + "/" + filename);
      
      ManualFile manualFile = new ManualFile();
      manualFile.setImg(filename);
      manualFile.setType(type);
      files.add(manualFile);
    }
    
    manual.setManualFile(files);
    
    if (manual.getContents().length() == 0) {
      content.put("status", "fail");
      content.put("message", "내용이 비어있습니다");
      
    } else if (manual.getProductNo() == 0) {
      content.put("status", "fail");
      content.put("message", "제품번호가 없습니다");
      
    } else {
      manualService.add(manual);
      content.put("status", "success");
    }
    
    return content;
  } // add




}
