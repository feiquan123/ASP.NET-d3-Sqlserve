//垂直Bar，加刻度
var file = document.getElementById('path').title;
//var file = "Data/clientuser1_29_answer_2019-05-08_19-7-44-399.csv";

d3.csv(file,function (d) {
    return {
        // data1: new Date(+d.data1, 0, 1), // convert "data1" column to Date
        data1: "第"+d.data1+"题",
        data2: +d.data2 // convert "data2" column to number
    };
}).then(function (data) {
    //console.log(data);
    var //data=[1,8,5,6,8,9,3,5,2,20],
        width=1000,
        height=500,
        margin={left:40,top:40,right:40,bottom:40},
        svg_width=width+margin.left+margin.right,
        svg_height=height+margin.top+margin.bottom;

    //离散缩放 data2=>[0,width]
    var scale_x=d3.scaleBand()
        .domain(data.map(function (d) {
            return d.data1;
        }))
        .range([0,width])
        .padding(0.1);

    //线性缩放
    var scale_y=d3.scaleLinear()
        .domain([0,d3.max(data,function (d) {
            return d.data2;
        })])
        .range([height,0])


    var svg=d3.select("#barchart")
        .append("svg")
        .attr("width",svg_width)
        .attr("height",svg_height)

    var chart=svg.append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")");

    var x_axis_color="steelblue",
        y_axis_color="steelblue";

    var x_axis=chart.append('g')
        .call(d3.axisBottom(scale_x))
        .attr("transform","translate(0,"+height+")");

    x_axis.selectAll("path")
        .attr("stroke",x_axis_color)

    x_axis.selectAll("line")
        .attr("stroke",x_axis_color)

    x_axis.selectAll("text")
        .attr("font-size",'2em')

    var y_axis=chart.append('g')
        .call(d3.axisLeft(scale_y));

    y_axis.selectAll("path")
        .attr("stroke",y_axis_color)

    y_axis.selectAll("line")
        .attr("stroke",y_axis_color)

    y_axis.selectAll("text")
        .attr("font-size",'2em')

    //Y轴注解
    chart.append("text")
        .text("(总分)")
        // .attr("text-anchor","end")
        // .attr("transform","rotate(-90)")
        .attr("dy","1em")
    //X轴注解
    chart.append("text")
        .text("(题)")
        // .attr("text-anchor","end")
        .attr("transform","translate("+width+","+height+")")
        .attr("dy","1em")

    var bar=chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")
        .attr("transform",function (d,i) {
            return "translate("+scale_x(d.data1)+",0)"
        })



    bar.append("rect")
        .attr("y",function (d) {
            return scale_y(d.data2);
        })
        .attr("height",function (d) {
            return height-scale_y(d.data2);
        })
        .attr("width",scale_x.bandwidth() )
        .attr("class",".rect")

    bar.append("text")
        .text(function (d) {
            return d.data2+"分";
        })
        .attr("y",function (d) {
            return scale_y(d.data2);
        })
        .attr("x",scale_x.bandwidth() /2)
        .attr("dy","1em")
        .style("text-anchor","middle")
        .style("fill","white")

})