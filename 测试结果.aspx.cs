using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    String filepath=null;
    String userID = null;
    String username = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        userID = ""+5;
        username = "clientuser1";

        //插入数据完成后导出csv文件
        filepath = getFilePath(username, userID);
        DB db2 = new DB();
        if (db2.exportQueryUserAnsawer(Convert.ToInt16(userID), filepath))
        {
            Response.Write("<script>alert('保存文件成功');</script>");
        }
        else
        {
            Response.Write("<script>alert('⚠保存文件失败');</script>");

        }
        //转相对路径
        filepath = urlconvertor(filepath);

        //以上变量可从session中获取
        //try
        //{
        //    username = Session["ClientUsername"].ToString();
        //    userID = Session["ClientUserID"].ToString();
        //    filepath = Session["FliePath"].ToString();
        //    filepath = urlconvertor(filepath);
        //   // Response.Write(filepath + "<br/>");
        //}
        //catch
        //{
        //    Response.Write("<script>alert('请先登录！');;window.location.href='登录.aspx';</script>");
        //    return;
        //}

        //设置以下属性是为了，实现与js数据交互
        this.name.Text = username;
        this.name.ToolTip = username;
        this.path.ToolTip = filepath;
    }

    //退出登录
    protected void Button1_Click(object sender, EventArgs e)
    {
        Session.Clear();
        Response.Redirect("登录.aspx");
    }

     //生成文件物理路径 如下
    //F:\Demo\Data\username_5_answer_2019-05-08_18-29-48-792.csv

    protected String getFilePath(String username,String userID ) {
        String year = DateTime.Now.Year.ToString();
        String mouth = DateTime.Now.Month.ToString();
        String day = DateTime.Now.Day.ToString();
        String houre = DateTime.Now.Hour.ToString();
        String minute = DateTime.Now.Minute.ToString();
        String second = DateTime.Now.Second.ToString();
        String millsecond = DateTime.Now.Millisecond.ToString();
        if (Convert.ToInt16(mouth) < 10) mouth = "0" + mouth;
        if (Convert.ToInt16(day) < 10) day = "0" + day;
        String date = year + "-" + mouth + "-" + day + "_" + houre + "-" + minute + "-" + second + "-" + millsecond;
        //Response.Write(date);

        //插入完成后导出csv文件
        filepath = "\\Data\\" + username + "_" + userID + "_answer_" + date + ".csv";
        filepath = urlconvertorlocal(filepath);
        return filepath;
    }

    //转绝对路径
    private string urlconvertorlocal(string url)
    {
        string tmpRootDir = Server.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath.ToString());//获取程序根目录
        string reurl = tmpRootDir + url.Replace(@"/", @"/"); //转换成绝对路径
        return reurl;
    }
    //本地路径转换成URL相对路径
    private string urlconvertor(string url)
    {
        string tmpRootDir = Server.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath.ToString())+"\\";//获取程序根目录
        string reurl = url.Replace(tmpRootDir, ""); //转换成相对路径
        reurl = reurl.Replace("\\", "/");
        return reurl;
    }
    
}