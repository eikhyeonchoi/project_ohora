package bitcamp.team.web.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;
import javax.servlet.ServletContext;
import javax.servlet.http.Part;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.ProductFile;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.SatisfyService;
import bitcamp.team.service.TipService;

@RestController("json/ProductController")
@RequestMapping("/json/product")
public class ProductController {

  String uploadDir;

  ProductService productService;
  SatisfyService satisfyService;
  TipService tipService;
  ServletContext servletContext;

  public ProductController(
      ProductService productService,
      SatisfyService satisfyService, 
      TipService tipService,
      ServletContext servletContext) {
    this.productService = productService;
    this.satisfyService = satisfyService;
    this.tipService = tipService;
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
    int memberNo = tipService.confirm(no);
    if(memberNo == 1) {
      content.put("status","success");
    } else {
      content.put("status", "fail");
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
  public Object findReviewedMember(int uNo, int pNo) {
    HashMap<String, Object> content = new HashMap<>();
    HashMap<String, Object> paramMap = new HashMap<>();

    paramMap.put("uNo", uNo);
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
      System.out.println(product);
      for (Part part : productFiles) {
        String filename = UUID.randomUUID().toString();
        String filepath = uploadDir + "/"  +filename;
        part.write(filepath);
        
        ProductFile productFile = new ProductFile();
        productFile.setImg(filename);
        System.out.println(productFile);
        files.add(productFile);
      }
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
        part.write(uploadDir + "/" + filename);
        
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
}
