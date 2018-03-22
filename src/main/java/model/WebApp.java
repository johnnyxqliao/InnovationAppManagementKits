package model;

public class WebApp {
   //tomcat自动获取参数
   private long visitNum;
   private String displayName;
   private String appPath;
   private int usingNumber;
   private boolean isRunning;
   //web.xml自定义参数
   private String webAppVersion;
   private String webAppAttributeLabel;
   private String webAppDescription;
   private String webAppIcon;
   private String webAppCategory;

   public long getVisitNum () {
      return visitNum;
   }

   public void setVisitNum (long visitNum) {
      this.visitNum = visitNum;
   }

   public String getDisplayName () {
      return displayName;
   }

   public void setDisplayName (String displayName) {
      this.displayName = displayName;
   }

   public String getAppPath () {
      return appPath;
   }

   public void setAppPath (String appPath) {
      this.appPath = appPath;
   }

   public int getUsingNumber () {
      return usingNumber;
   }

   public void setUsingNumber (int usingNumber) {
      this.usingNumber = usingNumber;
   }

   public boolean isRunning () {
      return isRunning;
   }

   public void setRunning (boolean running) {
      isRunning = running;
   }

   public String getWebAppVersion () {
      return webAppVersion;
   }

   public void setWebAppVersion (String webAppVersion) {
      this.webAppVersion = webAppVersion;
   }

   public String getWebAppAttributeLabel () {
      return webAppAttributeLabel;
   }

   public void setWebAppAttributeLabel (String webAppAttributeLabel) {
      this.webAppAttributeLabel = webAppAttributeLabel;
   }

   public String getWebAppDescription () {
      return webAppDescription;
   }

   public void setWebAppDescription (String webAppDescription) {
      this.webAppDescription = webAppDescription;
   }

   public String getWebAppIcon () {
      return webAppIcon;
   }

   public void setWebAppIcon (String webAppIcon) {
      this.webAppIcon = webAppIcon;
   }

   public String getWebAppCategory () {
      return webAppCategory;
   }

   public void setWebAppCategory (String webAppCategory) {
      this.webAppCategory = webAppCategory;
   }
}
