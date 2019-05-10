<%@ Page Language="C#" AutoEventWireup="true" CodeFile="测试结果.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>测试结果</title>
    <style type="text/css">
        .hidden
        {
            display:none
            }
        .choice
        {
            display:block
            }
    </style>
    
    <script type="text/javascript" src="js/d3.min.js"></script>
</head>
<body>
    
    <form id="form1" runat="server">
    <div>
        <asp:Label ID="name" runat="server" Text="username"></asp:Label>
        <%--为了c#与js交互--%>
        <asp:Label ID="path" runat="server" Text="path" class="hidden" ></asp:Label>
        <asp:Button ID="Button1" runat="server" Text="退出登录" onclick="Button1_Click" />

        <%--使用页面回发响应慢,使用JS控制--%>
        <div id="radio">
            <asp:RadioButton ID="RadioButton1" runat="server" Text="条形图" GroupName="g1" 
            Checked="true" 
                />
            <asp:RadioButton ID="RadioButton2" runat="server" Text="面积图" GroupName="g1" 
                />
            <asp:RadioButton ID="RadioButton3" runat="server" Text="柱状图" GroupName="g1" 
                
                />
            <asp:RadioButton ID="RadioButton4" runat="server" Text="饼状图" GroupName="g1" 
                />
        </div>

        <asp:Panel ID="Pane_LineChart" runat="server" class="choice">
            <link href="css/linechart.css" type="text/css" media="screen" rel="Stylesheet" />
            <div id="linechart_container">
                <div id="linechart">
            
                </div>
            </div>
            <script type="text/javascript" src="js/linechart.js"></script>
        </asp:Panel>

        <asp:Panel ID="Panel_AreaChart" runat="server" class="hidden">
            <link href="css/areachart.css" type="text/css" media="screen" rel="Stylesheet" />
            <div id="areachart_container">
                <div id="areachart">
            
                </div>
            </div>
            <script type="text/javascript" src="js/areachart.js"></script>
        </asp:Panel>

        <asp:Panel ID="Panel_BarChart" runat="server" class="hidden">
            <link href="css/barchart.css" type="text/css" media="screen" rel="Stylesheet" />
            <div id="barchart">
            
            </div>
            <script type="text/javascript" src="js/barchart.js"></script>
        </asp:Panel>

        <asp:Panel ID="Panel_PieChart" runat="server" class="hidden">
             <link href="css/piechart.css" type="text/css" media="screen" rel="Stylesheet" />
            <div id="piechart">
            
            </div>
            <script type="text/javascript" src="js/piechart.js"></script>
        </asp:Panel>

        
    </div>
    </form>

    <script type="text/javascript" src="js/radioButton.js"></script>
</body>
</html>
