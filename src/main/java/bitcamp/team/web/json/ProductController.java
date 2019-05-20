package bitcamp.team.web.json;

import java.util.HashMap;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.domain.Product;
import bitcamp.team.service.ProductService;
import bitcamp.team.service.SatisfyService;
import bitcamp.team.service.TipService;

@RestController("json/ProductController")
@RequestMapping("/json/product")
public class ProductController {

  String uploadDir;

  @Autowired ProductService productService;
  @Autowired SatisfyService satisfyService;
  @Autowired TipService tipService;
  @Autowired ServletContext servletContext;

  public ProductController(
      ProductService productService,
      SatisfyService satisfyService, 
      TipService tipService) {
    this.productService = productService;
    this.satisfyService = satisfyService;
    this.tipService = tipService;
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
    if(memberNo == 0) {
      content.put("status","success");
    } else {
      content.put("status", "fail");
    }

    return content;
  } // confirmTip


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


  @GetMapping("list")
  public Object list(
      @RequestParam(required = false) int largeNo, 
      @RequestParam(required = false) int smallNo, 
      @RequestParam(defaultValue = "undefined", required = false) String productName) {

    HashMap<String, Object> param = new HashMap<>();
    // 대분류 소분류 넣지않고 검색
    if((largeNo == 0 && smallNo == 0) && !productName.equals("undefined")) {
      param.put("productName", productName);
    }

    // 다 채워넣고 검색
    if(largeNo != 0) {
      param.put("largeNo", largeNo);

      if (smallNo != 0) {
        param.put("smallNo", smallNo);

        if(!productName.equals("undefined")) {
          param.put("productName", productName);
        }
      }
    }
    HashMap<String, Object> returnMap = new HashMap<>();
    returnMap.put("list", productService.list(param));
    System.out.println("요청");

    return returnMap;
  } // list


  @PostMapping("add")
  public Object add(Product product) {
    HashMap<String,Object> content = new HashMap<>();
    try {
      if (product.getName().equals("") ||
          product.getSmallCategoryNo() == 0 || 
          product.getManufacturerNo() == 0)
        throw new Exception("필수 입력 사항을 입력하지 않았습니다");

      productService.add(product);
      content.put("status", "success");
    } catch (Exception e) {
      content.put("status", "fail");
      content.put("message", e.getMessage());
    }

    return content;
  } // add

}
