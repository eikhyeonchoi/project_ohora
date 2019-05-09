package bitcamp.team.third.conf;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class<?>[] {AppConfig.class/* , DatabaseConfig.class, MybatisConfig.class */};
  }

  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class<?>[] {DefaultWebConfig.class};
  }

  @Override
  protected String getServletName() {
    return "app";
  }

  @Override
  protected String[] getServletMappings() {
    return new String[] {"/app/*"};
  }

  @Override
  protected Filter[] getServletFilters() {
    return new Filter[] {new CharacterEncodingFilter("UTF-8")};
  }

  @Override
  protected void customizeRegistration(Dynamic registration) {
    MultipartConfigElement multipartConfig =
        new MultipartConfigElement("/tmp", 5000000, 20000000, 1000000);
    registration.setMultipartConfig(multipartConfig);
  }
}
