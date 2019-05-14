package bitcamp.team.web.json;

import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.team.service.ProductService;

@RestController("json/ProductController")
@RequestMapping("/json/product")
public class ProductController {

  ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping("ctgList")
  public Object ctgList() {
    return productService.findCategory();
  }
  
  
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
  
  
  

}
