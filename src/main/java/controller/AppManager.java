package controller;

import com.alibaba.fastjson.JSON;

import model.WebApp;
import org.apache.catalina.Container;
import org.apache.catalina.Context;
import org.apache.catalina.DistributedManager;
import org.apache.catalina.Manager;
import org.apache.catalina.manager.ManagerServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@WebServlet("/AppManager")
public final class AppManager extends ManagerServlet {
   private boolean showProxySessions = false;

   @Override
   public void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
      Container children[] = host.findChildren();
      String contextNames[] = new String[children.length];
      for (int i = 0; i < children.length; i++)
         contextNames[i] = children[i].getName();
      Arrays.sort(contextNames);
      List<WebApp> webApps = new ArrayList<WebApp>();
      for (String contextName : contextNames) {
         Context ctxt = (Context) host.findChild(contextName);
         if (ctxt != null) {
            String displayPath = ctxt.getPath();
            if (displayPath.equals("")) {
               displayPath = "/";
            }
            WebApp webApp = new WebApp();
            //tomcat自动获取参数
            Manager manager = ctxt.getManager();
            webApp.setVisitNum(manager.getSessionCounter());//webApp访问次数
            webApp.setDisplayName(ctxt.getDisplayName());//项目名
            webApp.setAppPath(displayPath);//项目访问路径
            webApp.setRunning(ctxt.getState().isAvailable());//项目状态
            //web.xml自定义参数
            webApp.setWebAppVersion(ctxt.getServletContext().getInitParameter("webAppVersion"));//项目版本
            webApp.setWebAppAttributeLabel(ctxt.getServletContext().getInitParameter("webAppAttributeLabel"));//APP属性标签
            webApp.setWebAppDescription(ctxt.getServletContext().getInitParameter("webAppDescription"));//APP功能描述
            webApp.setWebAppIcon(ctxt.getServletContext().getInitParameter("webAppIcon"));//APP图标路径
            webApp.setWebAppCategory(ctxt.getServletContext().getInitParameter("webAppCategory"));//APP分类

            if (manager instanceof DistributedManager && showProxySessions) {
               webApp.setUsingNumber(((DistributedManager) manager).getActiveSessionsFull());
            } else {
               webApp.setUsingNumber(manager.getActiveSessions());
            }
            webApps.add(webApp);
         }
      }
      response.setContentType("text/html;charset=utf-8");
      response.getWriter().print(JSON.toJSONString(webApps));
      System.out.println(webApps);
   }

   @Override
   public void doPost (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
      this.doGet(request, response);
   }
}