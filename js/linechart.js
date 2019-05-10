var file = document.getElementById('path').title;
var username=document.getElementById('name').title;

d3.csv(file,function (d) {
    return {
        data1:'第'+d.data1+'题',
        data2:+d.data2,
    }
}).then(function (data) {
    //console.log(data);

    var title=username+'的各题得分',
        width=1000,
        height=500,
        margin={left:50,top:50,right:50,bottom:50},
        svg_width=width+margin.left+margin.right,
        svg_height=height+margin.bottom+margin.top,
        //小圆点半径
        circle_radius=8,
        circle_color="steelblue";


    
    //离散x轴的数据data1=>[0,width]
    var scale_x=d3.scaleBand()
        .domain(data.map(function (d) {
            return d.data1;
        }))
        .range([0,width])
        .padding(0.1)

    //线性缩放y轴数据data2=>[height,0]
    var scale_y=d3.scaleLinear()
        .domain([0,d3.max(data,function (d) {
            return d.data2;
        })])
        .range([height,0])


    // 添加svg
    var svg=d3.select('#linechart')
        .append('svg')
        .attr('width',svg_width)
        .attr('height',svg_height)

    //图表
    var chart=svg.append('g')
        .attr('transform','translate('+margin.left+','+margin.top+')');

    chart.append('title')
        .text(title)

     //画线函数
     var line_generator=d3.line()
         .x(function (d) {
             //console.log('x'+(+scale_x(d.data1)+scale_x.bandwidth()/2))
             return +scale_x(d.data1)+scale_x.bandwidth()/2
         })
         .y(function (d) {
             //console.log('y:'+scale_y(d.data2))
             return +scale_y(d.data2)
         })
         .curve(d3.curveMonotoneX)
     //画路径
     chart.append('path')
         .attr('d',line_generator(data))
         .attr('class','curve')

//    // 画面积函数
//    var area_generator= d3.area()
//        .x(function (d) {
//            return +scale_x(d.data1)+scale_x.bandwidth()/2
//        })
//        .y0(height)
//        .y1(function (d) {
//            return +scale_y(d.data2)
//        })
//        .curve(d3.curveMonotoneX)

//    //画面积
//    chart.append("path")
//        .attr("d",area_generator(data)) //d="M1,0L20,40.....  d-path data
//        //.style("fill","steelblue")
//        .attr("class","area")

    //x轴的样式
    var x_axis=chart.append('g')
        .attr('class','axis')
        .append('line')
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',height)
        .attr('y2',height)

    //y轴的样式
    var y_axis=chart.append('g')
        .attr('class','axis')
        .append('line')
        .attr('x1',0)
        .attr('x2',0)
        .attr('y1',0)
        .attr('y2',height)

    //行
    var x_axis_content=d3.axisBottom(scale_x)
        .ticks(data.length)
        .tickSize(-height)

    var rows=chart.append('g')
        .call(x_axis_content)
        .attr("transform","translate(0,"+height+")")
        .attr('id','rows')



    //列
    var y_axis_content=d3.axisLeft(scale_y)
        //ticks()是设定整个坐标轴上到底要有几个标记
        .ticks(data.length)
        //tickSize()使其覆盖整个显示区域就可以用ticks绘制成网格线
        .tickSize(-width)

    var cols=chart.append('g')
        .call(y_axis_content)
        .attr('id','cols')


    //x轴的注解
    chart.append('text')
        .text('(题)')
        .attr('transform','translate('+width+','+height+')')
        .attr('dy','1em')
        .attr('class','tips')

    //y轴的注解
    chart.append('text')
        .text('(分)')
        .attr('dy','1em')
        .attr('class','tips')


    //定义每个小圆点的左右区域
    var item=chart.selectAll('.item')
        .data(data)
        .enter()
        .append("g")
        .attr("transform",function (d,i) {
            return "translate("+scale_x(d.data1)+",0)"
        })


    //小圆点提示
    item.append('title')
        .text(function (d) {
            return  d.data2+"分";
        })

    //小圆点
    item.append('circle')
        .attr('cx',function (d,i) {
            return scale_x.bandwidth()/2
        })
        .attr('cy',function (d,i) {
            return scale_y(d.data2)
        })
        .attr('r',circle_radius)
        .attr('class','circle')

    //文字信息
    item.append('text')
        .text(function (d) {
            return  d.data2+"分";
        })
        .attr('x',function (d) {
            return scale_x.bandwidth()/2
        })
        .attr('y',function (d) {
            return scale_y(d.data2)
        })
        .attr('text-anchor','middle')
        .attr('dy','1.5em')
    //.attr('fill','white')

    //改变x轴文字的偏移量
    chart.select("#rows")
        .selectAll('text')
        .attr('dy','1.2em')

    //改变y轴文字的偏移量
    chart.select("#cols")
        .selectAll('text')
        .attr('dx','-0.5em')

});