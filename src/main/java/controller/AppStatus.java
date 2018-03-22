package controller;

import org.apache.catalina.manager.Constants;
import org.apache.catalina.manager.ManagerServlet;
import org.apache.catalina.util.ContextName;
import org.apache.tomcat.util.res.StringManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

@WebServlet("/AppStatus")
public class AppStatus extends ManagerServlet {
   protected void doPost (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

      StringManager smClient = StringManager.getManager(
              Constants.Package, request.getLocales());
      //用户操作
      String command = request.getParameter("Info");
      //请求路径
      String path = request.getParameter("path");
      ContextName cn = null;
      if (path != null) {
         cn = new ContextName(path, request.getParameter("version"));
      }
      response.setContentType("text/html; charset=" + Constants.CHARSET);
      String message = "";
      if (command == null || command.length() == 0) {
      } else if (command.equals("/reload")) {
         message = reload(cn, smClient);
      } else if (command.equals("/start")) {
         message = start(cn, smClient);
      } else if (command.equals("/stop")) {
         message = stop(cn, smClient);
      } else {
         doGet(request, response);
      }
      //输出打印信息
      response.getWriter().print(message);
   }

   public void doGet (HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      this.doPost(request, response);
   }

   private String reload (ContextName cn, StringManager smClient) {
      StringWriter stringWriter = new StringWriter();
      PrintWriter printWriter = new PrintWriter(stringWriter);
      super.reload(printWriter, cn, smClient);
      return stringWriter.toString();
   }

   private String start (ContextName cn, StringManager smClient) {
      StringWriter stringWriter = new StringWriter();
      PrintWriter printWriter = new PrintWriter(stringWriter);
      super.start(printWriter, cn, smClient);
      return stringWriter.toString();
   }

   private String stop (ContextName cn, StringManager smClient) {
      StringWriter stringWriter = new StringWriter();
      PrintWriter printWriter = new PrintWriter(stringWriter);
      super.stop(printWriter, cn, smClient);
      return stringWriter.toString();
   }
}
