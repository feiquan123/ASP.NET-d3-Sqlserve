var file = document.getElementById('path').title;

d3.csv(file,function (d) {
    return {
        data1: "第"+d.data1+"题",
        data2:+d.data2,
    }
}).then(data=>{
    //console.log(data);
    var sum=d3.sum(data.map(function (d) {
        return d.data2
    }))

    for(i in data){
        data[i].Percentage=(data[i].data2/sum*100).toFixed(0)+"%";
    }
    //console.log(data);

    var width=800,
        height=800,
        margin={"left":30,"top":30,"right":30,"bottom":30},
        svg_width=width+margin.left+margin.right,
        svg_height=height+margin.top+margin.bottom,
        font_size=15;

    var svg=d3.select("#piechart")
        .append("svg")
        .attr("width",width)
        .attr("height",height)


    var Pie=svg.append("g")
        .attr("transform","translate("+width/2+","+height/2+")")

    var arc_generator=d3.arc()
        .innerRadius(width/8)
        .outerRadius(width/4)
        // .startAngle(0)
        // .endAngle(120*Math.PI/180);

    var angle_data=d3.pie()
        .value(function (d) {
            return d.data2;
        })
    //console.log(angle_data(data));

    var color=d3.schemeCategory10;
    //console.log(color)

    //生成内部圆环
    Pie.selectAll("path")
        .data(angle_data(data))
        .enter()
        .append("path")
        .attr("d",arc_generator)
        .style("fill",function (d,i) {
            var j=i%10;
            return color[j];
        })
        .attr("class","path")

    //标注
    var arc_label=d3.arc()
        .innerRadius(width/4)
        .outerRadius(width/2)

    Pie.selectAll(".arc_label")
        .data(angle_data(data))
        .enter()
        .append("path")
        .attr("d",arc_label)
        .attr("class",".arc_label")
        .style("fill","none")

    //画标注线
    function line_label(angle_data) {
        var str=""
        var i=0;
        for (d in angle_data){
            str="M"+arc_generator.centroid(angle_data[d])[0]+","+arc_generator.centroid(angle_data[d])[1];
            str=str+"L"+arc_label.centroid(angle_data[d])[0]+","+arc_label.centroid(angle_data[d])[1]
            // console.log(str);
            Pie.append("path")
                .attr("d",str)
                .attr("stroke",color[i])
                .attr("stroke-width",2)
            i++;
            if(i>=10)i=0;
        }
    }

    line_label(angle_data(data));

    //注解文字
    var text=Pie.selectAll("text")
        .data(angle_data(data))
        .enter()
        .append("text")
        .attr("transform",function (d) {
            return "translate("+arc_label.centroid(d)+")"
        })
        .attr("text-anchor",function (d) {
            var x=arc_label.centroid(d)[0];
            return x<=0?"end":"start";
        })
        .attr("font-size",font_size)
        .style("fill",function (d,i) {
            var j=i%10;
            return color[j];
        })
        .style("text-decoration","underline")
        .text(function (d) {
            return d.data.data1+': '+d.data.Percentage;
        })
})