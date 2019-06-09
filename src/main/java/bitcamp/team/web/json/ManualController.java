package bitcamp.team.web.json;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import bitcamp.team.domain.Manual;
import bitcamp.team.domain.ManualFile;
import bitcamp.team.domain.Product;
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
      
      Product product = productService.get(no);
      manual.setName(product.getName());
      
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
      List<ManualFile> mFile = manual.get(0).getManualFile();
      ManualFile typeNo = new ManualFile();
      for (ManualFile cont : mFile) {
        typeNo.setTypeNo(cont.getTypeNo());
      }
      contents.put("manual", manual);
      contents.put("mFile", mFile);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    
    return contents;
  }
  
  
  
  @GetMapping("allProductName")
  public Object allProductName() {
    HashMap<String, Object> content = new HashMap<>();
    content.put("allProduct", manualService.getAllProduct());
    return content;
  }
  
  
  @PostMapping("hyeonTemp")
  public Object hyeonTemp(
      int productNo,
      Part[] basicManualFiles, 
      String[] basicContents,
      @RequestParam(required = false) Part[] componentManualFiles,
      @RequestParam(required = false) String[] componentContents,
      @RequestParam(required = false) Part[] cautionManualFiles,
      @RequestParam(required = false) String[] cautionContents,
      @RequestParam(required = false) String[] videoLinks,
      @RequestParam(required = false) String[] videoContents
      ) throws IOException, ServletException {
    
    System.out.println(productNo);
    
    HashMap<String, Object> content = new HashMap<>();
    
    if(basicManualFiles != null) {
      System.out.println("basic files");
      for (Part part : basicManualFiles) {
        String filename = UUID.randomUUID().toString();
        System.out.println(filename);
      }
    }
    
    if (componentManualFiles != null) {
      System.out.println("component files");
      for (Part part : componentManualFiles) {
        String filename = UUID.randomUUID().toString();
        System.out.println(filename);
      }
    }
    
    if (cautionManualFiles != null) {
      System.out.println("caution files");
      for (Part part : cautionManualFiles) {
        String filename = UUID.randomUUID().toString();
        System.out.println(filename);
      }
    }
    
    if (basicContents != null) {
      System.out.println("basic contents");
      for (String s : basicContents) {
        System.out.println(s);
      }
    }
    
    if (componentContents != null) {
      System.out.println("component contents");
      for (String s : componentContents) {
        System.out.println(s);
      }
    }
    
    if (cautionContents != null) {
      System.out.println("caution contents");
      for (String s : cautionContents) {
        System.out.println(s);
      }
    }
    if (videoLinks != null) {
      System.out.println("video links");
      for (String s : videoLinks) {
        System.out.println(s);
      }
    }
    if (videoContents != null) {
      System.out.println("video contents");
      for (String s : videoContents) {
        System.out.println(s);
      }
    }
    
    
    return content;
  }
  
}









