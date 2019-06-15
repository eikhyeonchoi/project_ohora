package bitcamp.team.web.json;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import org.imgscalr.Scalr;
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


  @PostMapping("add")
  public Object add(
      @RequestParam(defaultValue = "0") int productNo,
      @RequestParam(defaultValue = "undefined") String productName,
      Part[] basicManualFiles, 
      String[] basicContents,
      @RequestParam(required = false) Part[] componentManualFiles,
      @RequestParam(required = false) String[] componentContents,
      @RequestParam(required = false) Part[] cautionManualFiles,
      @RequestParam(required = false) String[] cautionContents,
      @RequestParam(required = false) String[] videoLinks,
      @RequestParam(required = false) String[] videoContents
      ) throws IOException, ServletException {
    String uploadDir = servletContext.getRealPath("/upload/manualfile");

    System.out.println(uploadDir);
    System.out.println(productNo);
    System.out.println(productName);
    HashMap<String, Object> content = new HashMap<>();
    ArrayList<ManualFile> files = new ArrayList<>(); 
    
    try {

      if(basicManualFiles != null) {
        System.out.println("basic files, contents");
        for (int i = 0; i < basicManualFiles.length; i++) {
          String filename = UUID.randomUUID().toString();
          String filepath = uploadDir + "/" + filename;
          basicManualFiles[i].write(filepath);

          ManualFile manualFile = new ManualFile();
          manualFile.setFile(filename);
          manualFile.setContents(basicContents[i]);
          manualFile.setTypeNo(1);
          files.add(manualFile);

          try {
            if (!basicManualFiles[i].getContentType().equals("application/pdf") ||
                !basicManualFiles[i].getSubmittedFileName().contains("pdf")) {
              makeThumbnail(filepath, 300, 300);
            }
          } catch(Exception e) {
            throw new RuntimeException("basic files 썸네일 생성중 오류발생");
          }
        } // for
      }

      if (componentManualFiles != null) {
        System.out.println("component files, contents");
        for (int i = 0; i < componentManualFiles.length; i++) {
          String filename = UUID.randomUUID().toString();
          String filepath = uploadDir + "/" + filename;
          componentManualFiles[i].write(filepath);

          ManualFile manualFile = new ManualFile();
          manualFile.setFile(filename);
          manualFile.setContents(componentContents[i]);
          manualFile.setTypeNo(2);
          files.add(manualFile);

          try {
            if (!componentManualFiles[i].getContentType().equals("application/pdf") ||
                !componentManualFiles[i].getSubmittedFileName().contains("pdf")) {
              makeThumbnail(filepath, 300, 300);
            }
          } catch(Exception e) {
            throw new RuntimeException("component files썸네일 생성중 오류발생");
          }
        }
      }

      if (cautionManualFiles != null) {
        System.out.println("caution files, contents");
        for (int i = 0; i < cautionManualFiles.length; i++) {
          String filename = UUID.randomUUID().toString();
          String filepath = uploadDir + "/" + filename;
          cautionManualFiles[i].write(filepath);

          ManualFile manualFile = new ManualFile();
          manualFile.setFile(filename);
          manualFile.setContents(cautionContents[i]);
          manualFile.setTypeNo(3);
          files.add(manualFile);

          try {
            if (!cautionManualFiles[i].getContentType().equals("application/pdf") ||
                !cautionManualFiles[i].getSubmittedFileName().contains("pdf")) {
              makeThumbnail(filepath, 300, 300);
            }
          } catch(Exception e) {
            throw new RuntimeException("caution 썸네일 생성중 오류발생");
          }
        }
      }

      if (videoLinks != null) {
        System.out.println("video links");
        for (int i = 0; i < videoLinks.length; i++) {
          ManualFile manualFile = new ManualFile();
          manualFile.setFile(videoLinks[i]);
          manualFile.setContents(videoContents[i]);
          manualFile.setTypeNo(4);
          files.add(manualFile);
        }
      }
      
      Manual manual = new Manual();
      manual.setProductNo(productNo);
      manual.setName(productName);
      manual.setManualFile(files);
      
      if (productNo == 0 || productName == "undefined") {
        throw new Exception("제품번호 또는 제품이름이 없습니다");
        
      } else {
        manualService.add(manual);
        content.put("status", "success");
      }
      
      
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  }
  
  
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String, Object> content = new HashMap<>();
    HashMap<String, Object> paramNumbers = new HashMap<>();
    
    paramNumbers.put("manualNo", no);
    
    try {
      if (manualService.delete(no) == 0) {
        throw new Exception("해당 번호의 제품이 없습니다");
      }
      content.put("status", "success");
    } catch(Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
      
      
    }
    return content;
  } // delete
  

  

  private void makeThumbnail(String filePath, int width, int height) throws Exception { 
    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
    int dw = width, dh = height; 
    int ow = srcImg.getWidth(); 
    int oh = srcImg.getHeight(); 
    int nw = ow; 
    int nh = (ow * dh) / dw;
    if(nh > oh) { nw = (oh * dw) / dh; nh = oh; } 
    BufferedImage cropImg = Scalr.crop(srcImg, (ow-nw)/2, (oh-nh)/2, nw, nh);
    BufferedImage destImg = Scalr.resize(cropImg, dw, dh); 
    File thumbFile = new File(filePath + "_thumb");
    ImageIO.write(destImg, "jpg", thumbFile);
  } // makeThumbnail
}









