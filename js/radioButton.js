var radio1 = document.getElementById("RadioButton1");
var radio2 = document.getElementById("RadioButton2");
var radio3 = document.getElementById("RadioButton3");
var radio4 = document.getElementById("RadioButton4");


var Pane_LineChart = document.getElementById("Pane_LineChart");
var Panel_AreaChart = document.getElementById("Panel_AreaChart");
var Panel_BarChart = document.getElementById("Panel_BarChart");
var Panel_PieChart = document.getElementById("Panel_PieChart");

radio1.onclick = RadioButton1_CheckedChanged;
radio2.onclick = RadioButton2_CheckedChanged;
radio3.onclick = RadioButton3_CheckedChanged;
radio4.onclick = RadioButton4_CheckedChanged;

function RadioButton1_CheckedChanged() {
    //console.log("radio1");
    Pane_LineChart.className = "choice";
    Panel_AreaChart.className = "hidden";
    Panel_BarChart.className = "hidden";
    Panel_PieChart.className = "hidden";
}


function RadioButton2_CheckedChanged() {
    // console.log("radio2");
    Pane_LineChart.className = "hidden";
    Panel_AreaChart.className = "choice";
    Panel_BarChart.className = "hidden";
    Panel_PieChart.className = "hidden";
}


function RadioButton3_CheckedChanged() {
    //console.log("radio3");
    Pane_LineChart.className = "hidden";
    Panel_AreaChart.className = "hidden";
    Panel_BarChart.className = "choice";
    Panel_PieChart.className = "hidden";
}


function RadioButton4_CheckedChanged() {
    //console.log("radio4");
    Pane_LineChart.className = "hidden";
    Panel_AreaChart.className = "hidden";
    Panel_BarChart.className = "hidden";
    Panel_PieChart.className = "choice";
}