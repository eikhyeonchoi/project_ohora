package bitcamp.team.web.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.service.ManualService;
import bitcamp.team.service.ManufacturerService;
import bitcamp.team.service.ProductService;

@RestController("json/ManualController")
@RequestMapping("/json/manual")
public class ManualController {

  String uploadDir;
  ManualService manualService;
  ProductService productService;
  ManufacturerService manufacturerService;
  ServletContext servletContext;

  public ManualController(
      ManualService manualService, 
      ServletContext servletContext,
      ProductService productService,
      ManufacturerService manufacturerService) {
    this.manualService = manualService;
    this.servletContext = servletContext;
    this.productService = productService;
    this.manufacturerService = manufacturerService;
  }
  
  @GetMapping("list")
  public Object list(String keyword, String searchType) throws Exception {
    HashMap<String,Object> contents = new HashMap<>();
    
    try {
      List<Manual> list = manualService.list(keyword, searchType);
      
      contents.put("list", list);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    
    return contents;
  }
  
  @GetMapping("files")
  public Object files(int no) {
    HashMap<String,Object> content = new HashMap<>();
    
    try {
      Manual mList = manualService.getFile(no);
      
      content.put("mList", mList);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    
    return content;
  }
  
  @PostMapping("add")
  public Object add(String contents, int no, int type, Part[] manualFiles) {
    HashMap<String,Object> content = new HashMap<>();
    ArrayList<ManualFile> files = new ArrayList<>();
    Manual manual = new Manual();
    this.uploadDir = servletContext.getRealPath("/upload/manualFile");
    try {
      
      for (Part part : manualFiles) {
        String filename = UUID.randomUUID().toString();
        String filepath = uploadDir + "/" + filename;
        part.write(filepath);
        
        ManualFile manualFile = new ManualFile();
        
        manualFile.setFile(filename);
        manualFile.setContents(contents);
        manualFile.setTypeNo(type);
        files.add(manualFile);
      }
      
      manual.setManualFile(files);
      manual.setName(productService.get(no));
      
      manualService.add(manual);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    
    return content;
  }
  
  @GetMapping("detail")
  public Object detail(int no) {
    HashMap<String,Object> contents = new HashMap<>();
    
    try {
      manufacturerService.get(no);
      List<Manual> manual = manualService.get(no);
      contents.put("manual", manual);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    
    return contents;
  }
}
