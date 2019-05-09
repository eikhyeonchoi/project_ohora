package bitcamp.team.first.lms.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.util.UrlPathHelper;

// app-servlet.xml의 설정을 이 클래스로 대신한다.
// DispatcherServlet IoC 컨테이너가 사용할 설정 파일
@ComponentScan("bitcamp.team.first.lms.web")
@EnableWebMvc
public class DefaultWebConfig implements WebMvcConfigurer {
  @Override
  public void configurePathMatch(PathMatchConfigurer configurer) {
    // 매트릭스 변수를 등을 사용할 수 있도록 기능을 활성화시키려면
    // 이 메서드를 오버라이딩하여 파라미터로 넘겨 받은 객체를 통해
    // 설정해 줘야 한다.

    // 클라이언트가 보낸 URL을 처리하는 도우미 객체를 준비한다.
    UrlPathHelper urlPathHelper = new UrlPathHelper();

    // URL 경로에서 세미콜론(;)있는 값을 제거하지 않도록 설정한다.
    // http://localhost:8080/java-spring-webmvc/84
    // 그래야 페이지 컨트롤러의 request handler에서 해당 매트릭스 값을 추출할 수 있다.
    urlPathHelper.setRemoveSemicolonContent(false);

    // 위에서 준비한 도우미 객체를 설정기에 등록한다.
    // 이것은 XML에서 다음과 같이 설정한 것과 같다.
    // =>  <mvc:annotation-driven enable-matrix-variables="true"/>
    //
    configurer.setUrlPathHelper(urlPathHelper);
  }
  /*
  @Override
  public void configureViewResolvers(ViewResolverRegistry registry) {
    // 프론트 컨트롤러가 사용하는 기본 view resolver를 대체하고 싶다면
    // 이 메서드를 오버라이딩 한다.
    InternalResourceViewResolver viewResolver = new InternalResourceViewResolver(
        "/WEB-INF/jsp", ".jsp");
    viewResolver.setViewClass(JstlView.class);

    registry.jsp("/WEB-INF/jsp/", ".jsp");
  }
   */

  @Bean
  public ViewResolver viewResolver() {
    // 이 메서드는 DispatcherServlet의 다음 XML 설정에서 다음 설정과 같다.
    /*
     * <bean id="viewResolver"
    class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView" />
    <property name="prefix" value="/WEB-INF/jsp/" />
    <property name="suffix" value=".jsp" />
    </bean>
     */
    InternalResourceViewResolver vr = new InternalResourceViewResolver(
        "/WEB-INF/jsp/", ".jsp");
    vr.setViewClass(JstlView.class);
    return vr;
  }
  
  
}
