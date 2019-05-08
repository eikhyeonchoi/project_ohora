package bitcamp.team.third.web.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.apache.ibatis.logging.LogFactory;

public class AppInitListener implements ServletContextListener {
  @Override
  public void contextInitialized(ServletContextEvent sce) {
    LogFactory.useLog4J2Logging();

    ServletContext sc = sce.getServletContext();
    sc.setAttribute("contextRootPath", sc.getContextPath());
  }
}
