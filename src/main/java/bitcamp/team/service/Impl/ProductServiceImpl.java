package bitcamp.team.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import bitcamp.team.dao.ManualDao;
import bitcamp.team.dao.ManualFileDao;
import bitcamp.team.dao.ManufacturerDao;
import bitcamp.team.dao.ProductDao;
import bitcamp.team.dao.ProductFileDao;
import bitcamp.team.dao.ReviewDao;
import bitcamp.team.dao.SatisfyDao;
import bitcamp.team.dao.TipDao;
import bitcamp.team.dao.TipHistoryDao;
import bitcamp.team.domain.Manufacturer;
import bitcamp.team.domain.Product;
import bitcamp.team.domain.ProductFile;
import bitcamp.team.domain.Review;
import bitcamp.team.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

  ProductDao productDao;
  ManufacturerDao manufacturerDao;
  ProductFileDao productFileDao;
  SatisfyDao satisfyDao;
  ReviewDao reviewDao;
  ManualDao manualDao;
  ManualFileDao manualFileDao;
  TipDao tipDao;
  TipHistoryDao tipHistoryDao;


  public ProductServiceImpl(ProductDao productDao, ManufacturerDao manufacturerDao,
      ProductFileDao productFileDao, SatisfyDao satisfyDao, ReviewDao reviewDao, TipDao tipDao,
      ManualDao manualDao, TipHistoryDao tipHistoryDao, ManualFileDao manualFileDao) {
    this.productDao = productDao;
    this.manufacturerDao = manufacturerDao;
    this.productFileDao = productFileDao;
    this.satisfyDao = satisfyDao;
    this.reviewDao = reviewDao;
    this.manualDao = manualDao;
    this.tipDao = tipDao;
    this.tipHistoryDao = tipHistoryDao;
    this.manualFileDao = manualFileDao;
  }

  @Override
  public List<Product> list(int largeNo, int smallNo, String productName) {

    HashMap<String, Object> param = new HashMap<>();
    // 대분류 소분류 넣지않고 검색
    if ((largeNo == 0 && smallNo == 0) && !productName.equals("undefined")) {
      param.put("productName", productName);
    }
    // 다 채워넣고 검색
    if (largeNo != 0) {
      param.put("largeNo", largeNo);

      if (smallNo != 0) {
        param.put("smallNo", smallNo);

        if (!productName.equals("undefined")) {
          param.put("productName", productName);
        }
      }
    }
    return productDao.findAll(param);
  }

  @Override
  public Map<String, Object> findCategory() {
    HashMap<String, Object> ctgList = new HashMap<>();
    ctgList.put("largeList", productDao.findLargeCategory());
    ctgList.put("smallList", productDao.findSmallCategory());
    return ctgList;
  }

  @Override
  public List<Manufacturer> listManufacturer() {
    return manufacturerDao.findAllUseProductAdd();
  }

  @Override
  public int add(Product product) {
    int count = productDao.insert(product);
    List<ProductFile> productFiles = product.getProductFiles();
    for (ProductFile f : productFiles) {
      f.setProductNo(product.getNo());
    }
    productFileDao.insert(product.getProductFiles());

    return count;
  }

  @Override
  public int getNo(String name) {
    Product product = productDao.findNoByName(name);
    return product.getNo();
  }

  @Override
  public List<Product> getList(String name) {
    return productDao.findNoByNameList(name);
  }

  @Override
  public Product get(int no) {
    Product product = productDao.findByNo(no);
    return product;
  }

  @Override
  public Product getFile(int no) {
    return productDao.findFileByNo(no);
  }

  @Override
  public int update(Product product) {
    if (product != null) {
      productDao.update(product);
    }
    List<ProductFile> productFiles = product.getProductFiles();
    if (productFiles != null) {
      productFileDao.deleteByProductNo(product.getNo());
      productFileDao.insert(productFiles);
    }
    return 1;
  }

  @Override
  @SuppressWarnings("unchecked")
  public int deleteProduct(HashMap<String, Object> paramNumbers) {
    int productNo = (int) paramNumbers.get("productNo");
    int tipNo = (int) paramNumbers.get("tipNo");
    int manualNo = (int) paramNumbers.get("manualNo");
    List<Integer> reviews = (List<Integer>) paramNumbers.get("reviews");

    int count = 0;
    satisfyDao.deleteByProductNo(productNo);
    System.out.println("satisfy");
    
    for (Integer reviewNo : reviews) {
      reviewDao.deleteCommentReview(reviewNo);
    }
    
    
    reviewDao.deleteByProductNo(productNo);
    System.out.println("review");

    if (tipNo != 0) {
      tipHistoryDao.deleteByTipNo(tipNo);
      System.out.println("tip history");
    }

    if (manualNo != 0) {
      manualFileDao.delete(manualNo);
      System.out.println("manualfile");
    }

    tipDao.deleteByProductNo(productNo);
    System.out.println("tip");

    manualDao.deleteByProductNo(productNo);
    System.out.println("manual");

    productFileDao.deleteByProductNo(productNo);
    System.out.println("product file");

    if (productDao.delete(productNo) != 0) {
      System.out.println("product file");
      count++;
    }
    return count;
  }

  @Override
  public List<Product> list2(int largeNo, int smallNo, String keyword, String listType) {
    HashMap<String, Object> param = new HashMap<>();

    param.put("keyword", keyword);
    param.put("listType", listType);
    return productDao.findAll2(param);
  }

}


