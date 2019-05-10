Use 你的数据库名
go
--创建存储过程，根据userID返回每一题的分值

if exists (SELECT * FROM sysobjects    WHERE name='queryUserAnsawer')
	drop proc exportQueryUserAnsawer
go
 create   proc   queryUserAnsawer
 @id int    
  as 
	--这里可以自定义sql语句
  select 题库.题编号 题编号, (选项一分值*A+选项二分值*B+选项三分值*C+选项四分值*D) 总分 from  dbo.会员答案,题库 WHERE  会员编号=@id and 会员答案.题编号=题库.题编号
go  


--调用存储过程exportQueryUserAnsawer
 exec 你的数据库名..queryUserAnsawer 1
 
 
 
-- 创建函数，根据userID返回每一题的总分，并将其保存到自定义CSV的文件中
if exists (SELECT * FROM sysobjects    WHERE name='exportUserAnsawer')
	drop proc exportUserAnsawer
go
 

create   proc   exportUserAnsawer
(
	@id int  ,@filepath varchar(8000),--输入参数
	@re int output --输出参数
)
  as   
	declare   @s   varchar(8000)
	--csv文件的表头,你也可以自定义表头，但是为了与前端d3.js访问，直接就data1,data2了
	set @s='echo data1,data2>"'+@filepath+'"' 
	exec   master..xp_cmdshell  @s,no_output 
	--导出csv文件到temp目录
	set   @s='bcp   "exec 数据库名..queryUserAnsawer '+cast(@id as varchar(50))+'" queryout "'+'"%temp%\temp.csv"'+'"   /c /t,  /U"登录名"   -P"密码" /S 服务器名'  
	exec   master..xp_cmdshell   @s ,no_output 
	--将temp目录下的csv文件与之前的csv文件的表头合并
	set @s='more %temp%\temp.csv >>"'+@filepath+'"'
	exec   master..xp_cmdshell   @s ,no_output 
	--删除temp目录下的csv文件
	exec   master..xp_cmdshell   'del %temp%\temp.csv' ,no_output 
	--返回执行结果
	set @re=1 --如果可以执行这一句代表之前的语句没有报错
go

--调用存储过程exportUserAnsawer
 --F:\Data\data.csv
declare @w int
exec 学生核心素养测评..exportUserAnsawer 5, 'F:\Data\data.csv' ,@w output
--PRINT '执行结果：'+CONVERT(varchar(20),@w)
select @w as '返回值'


