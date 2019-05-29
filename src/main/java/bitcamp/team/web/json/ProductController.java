package bitcamp.team.web.json;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.awt.image.renderable.ParameterBlock;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import org.imgscalr.Scalr;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Member;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.ProductFile;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.ReviewService;
import bitcamp.team.service.SatisfyService;
import bitcamp.team.service.TipService;

@RestController("json/ProductController")
@RequestMapping("/json/product")
public class ProductController {

  String uploadDir;

  ProductService productService;
  SatisfyService satisfyService;
  TipService tipService;
  ReviewService reviewService;
  ServletContext servletContext;

  public ProductController(
      ProductService productService,
      SatisfyService satisfyService, 
      TipService tipService,
      ReviewService reviewService,
      ServletContext servletContext) {
    this.productService = productService;
    this.satisfyService = satisfyService;
    this.tipService = tipService;
    this.reviewService = reviewService;
    this.servletContext = servletContext;
  }
  

  @GetMapping("ctgList")
  public Object ctgList() {
    return productService.findCategory();
  } // ctgList

  @GetMapping("manuList")
  public Object listManufacturer() {
    HashMap<String, Object> content = new HashMap<>();
    content.put("manuList", productService.listManufacturer());
    return content;
  } // listManufacturer

  @GetMapping("confirmTip")
  public Object confirmTip(int no) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      int tipCount = tipService.confirm(no);
      if(tipCount == 1) {
        content.put("status","success");
        content.put("tipCount", tipCount);
      } else {
        content.put("status", "fail");
      }
    } catch (Exception e) {
      content.put("error", e.getMessage());
    }

    return content;
  } // confirmTip

  @GetMapping("detail")
  public Object detail(int no) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      String productName = productService.get(no);
      content.put("productName", productName);
      content.put("status", "successs");

    } catch (Exception e) {
      content.put("status", "fail");
      content.put("error", e.getMessage());
    }
    return content;
  }

  @GetMapping("findReviewedMember")
  public Object findReviewedMember(int pNo, HttpSession httpSession) {
    HashMap<String, Object> content = new HashMap<>();
    HashMap<String, Object> paramMap = new HashMap<>();

    Member member = (Member) httpSession.getAttribute("loginUser");
    paramMap.put("uNo", member.getNo());
    paramMap.put("pNo", pNo);
    int memberNo = satisfyService.getReviewedMember(paramMap);

    if(memberNo == 0) {
      content.put("status","success");
    } else {
      content.put("status", "fail");
    }
    return content;
  } // findReviewedMember

  @GetMapping("files")
  public Object files(int no) {
    System.out.println("files 내부 ==> " + no);
    HashMap<String,Object> contents = new HashMap<>();
    try {
      Product pList = productService.getFile(no);
      System.out.println(pList);
      contents.put("pList", pList);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }

  @GetMapping("list")
  public Object list(
      @RequestParam(required = false) int largeNo, 
      @RequestParam(required = false) int smallNo, 
      @RequestParam(defaultValue = "undefined", required = false) String productName) {
    HashMap<String, Object> returnMap = new HashMap<>();

    returnMap.put("list", productService.list(largeNo, smallNo, productName));

    return returnMap;
  } // list


  @PostMapping("add")
  public Object add(Product product, Part[] productFiles) {
    this.uploadDir = servletContext.getRealPath("/upload/productfile");

    HashMap<String,Object> content = new HashMap<>();
    ArrayList<ProductFile> files = new ArrayList<>();
    try {
      if (product.getName().equals("") ||
          product.getSmallCategoryNo() == 0 || 
          product.getManufacturerNo() == 0)
        throw new Exception("필수 입력 사항을 입력하지 않았습니다");
      
      for (Part part : productFiles) {
        String filename = UUID.randomUUID().toString() + ".png";
        String filepath = uploadDir + "/"  +filename;
        part.write(filepath);
        
        part.write(filepath);
        
        ProductFile productFile = new ProductFile();
        productFile.setImg(filename);
        
        files.add(productFile);
      } // for
      
      product.setProductFiles(files);
      if (product.getSmallCategoryNo() == 0) {
        throw new RuntimeException("소분류를 선택해주세요!");
      } else if (product.getName().length() == 0) {
        throw new RuntimeException("제품 제목을 입력해주세요!");
      } else if (product.getManufacturerNo() == 0) {
        throw new RuntimeException("제조사를 선택해주세요!");
      } else if (files.size() == 0) {
        throw new RuntimeException("최소 한개 사진을 등록해야 합니다.");
      } else {
        productService.add(product);
        System.out.println("add 마침");
        content.put("status", "success");
      }
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // add

  @PostMapping("update")
  public Object update(Product product, Part[] productFile) {
    this.uploadDir = servletContext.getRealPath("/upload/productfile");
    
    HashMap<String,Object> contents = new HashMap<>();
    ArrayList<ProductFile> files = new ArrayList<>();
    
    String orderName = productService.get(product.getNo());
    
    try {
      if (product.getName().equals("")) {
        product.setName(orderName);
      }
      for (Part part : productFile) {
        if (part.getSize() == 0) {
          continue;
        }
        String filename = UUID.randomUUID().toString();
        part.write(filename);

        ProductFile pfiles = new ProductFile();
        pfiles.setImg(filename);
        pfiles.setProductNo(product.getNo());
        files.add(pfiles);
      }
      product.setProductFiles(files);
      if (files.size() == 0) {
        throw new RuntimeException("최소 한 개 이상의 제품 사진을 등록해야 합니다.");
      }
      productService.update(product);
      contents.put("status", "success");
    } catch (Exception e) {
      contents.put("status", "fail");
      contents.put("error", e.getMessage());
    }
    return contents;
  }
  
  
  @GetMapping("delete")
  public Object delete(int no) {
    HashMap<String, Object> content = new HashMap<>();
    try {
      if (productService.deleteProduct(no) == 0) {
        throw new Exception("해당 번호의 제품이 없습니다");
      }
      content.put("status", "success");
    } catch(Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }
    return content;
  } // delete

  
  
  @SuppressWarnings("unused")
  private void makeThumbnail(String filePath, String fileName) throws Exception { 
    BufferedImage srcImg = ImageIO.read(new File(filePath)); 
    int dw = 250, dh = 150; 
    int ow = srcImg.getWidth(); int oh = srcImg.getHeight(); 
    int nw = ow; int nh = (ow * dh) / dw;
    if(nh > oh) { nw = (oh * dw) / dh; nh = oh; } 
    BufferedImage cropImg = Scalr.crop(srcImg, (ow-nw)/2, (oh-nh)/2, nw, nh);
    BufferedImage destImg = Scalr.resize(cropImg, dw, dh); 
    String thumbName = filePath + "THUMB_" + fileName; 
    File thumbFile = new File(thumbName);
    ImageIO.write(destImg, ".png", thumbFile);
  } // makeThumbnail
  
  
}
