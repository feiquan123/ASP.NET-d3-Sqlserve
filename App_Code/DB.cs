using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;

/// <summary>
/// DB 的摘要说明
/// </summary>
public class DB
{
    public SqlConnection Con = new SqlConnection();
    public SqlCommand Com = new SqlCommand();
    public SqlDataAdapter Da = new SqlDataAdapter();
    public DataSet Ds = new DataSet();

    public DB()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //        
    }
    //定义一个用于返回数据库连接字符串的方法
    public String GetConnectionString()
    {
        String ConStr;
        //  ConStr = System.Configuration.ConfigurationManager.AppSettings.Get("con").ToString();

       //  ConStr = System.Configuration.ConfigurationManager.ConnectionStrings["textconnectionstring"].ToString();
       ConStr = System.Configuration.ConfigurationManager.ConnectionStrings["连接名"].ToString();
        return ConStr;
    }

    //根据userID返回每一题的总分，并将其保存到自定义CSV的文件中
    //调用存储过程exportUserAnsawer
    public bool exportQueryUserAnsawer(int id, String filepath) {
        int re = 0;

        try
        {
            Con.ConnectionString = GetConnectionString();
            //打开连接
            Con.Open();
            //调用存储过程
            Com = new SqlCommand("exportUserAnsawer", Con);
            //设置命令的类型为存储过程 
            Com.CommandType = CommandType.StoredProcedure;
            // 设置参数 
            Com.Parameters.Add("@id", SqlDbType.Int);
            Com.Parameters.Add("@filepath", SqlDbType.VarChar);
            // 注意输出参数要设置大小,否则size默认为0
            Com.Parameters.Add("@re", SqlDbType.Int, 10);
            // 设置参数的类型为输出参数,默认情况下是输入, 
            Com.Parameters["@re"].Direction = ParameterDirection.Output;
            // 为参数赋值
            Com.Parameters["@id"].Value = id;
            Com.Parameters["@filepath"].Value = filepath;
            // 执行 
            Com.ExecuteNonQuery();
            // 得到输出参数的值,把赋值给re,注意,这里得到的是object类型的,要进行相应的类型转换
            re = (int)Com.Parameters["@re"].Value;
            if (re == 1) return true;
            else return false;
        }
        catch (Exception e){
           // Console.WriteLine(e.ToString());
            return false;
        }

    }

}
