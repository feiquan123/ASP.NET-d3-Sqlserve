Use ������ݿ���
go
--�����洢���̣�����userID����ÿһ��ķ�ֵ

if exists (SELECT * FROM sysobjects    WHERE name='queryUserAnsawer')
	drop proc exportQueryUserAnsawer
go
 create   proc   queryUserAnsawer
 @id int    
  as 
	--��������Զ���sql���
  select ���.���� ����, (ѡ��һ��ֵ*A+ѡ�����ֵ*B+ѡ������ֵ*C+ѡ���ķ�ֵ*D) �ܷ� from  dbo.��Ա��,��� WHERE  ��Ա���=@id and ��Ա��.����=���.����
go  


--���ô洢����exportQueryUserAnsawer
 exec ������ݿ���..queryUserAnsawer 1
 
 
 
-- ��������������userID����ÿһ����ܷ֣������䱣�浽�Զ���CSV���ļ���
if exists (SELECT * FROM sysobjects    WHERE name='exportUserAnsawer')
	drop proc exportUserAnsawer
go
 

create   proc   exportUserAnsawer
(
	@id int  ,@filepath varchar(8000),--�������
	@re int output --�������
)
  as   
	declare   @s   varchar(8000)
	--csv�ļ��ı�ͷ,��Ҳ�����Զ����ͷ������Ϊ����ǰ��d3.js���ʣ�ֱ�Ӿ�data1,data2��
	set @s='echo data1,data2>"'+@filepath+'"' 
	exec   master..xp_cmdshell  @s,no_output 
	--����csv�ļ���tempĿ¼
	set   @s='bcp   "exec ���ݿ���..queryUserAnsawer '+cast(@id as varchar(50))+'" queryout "'+'"%temp%\temp.csv"'+'"   /c /t,  /U"��¼��"   -P"����" /S ��������'  
	exec   master..xp_cmdshell   @s ,no_output 
	--��tempĿ¼�µ�csv�ļ���֮ǰ��csv�ļ��ı�ͷ�ϲ�
	set @s='more %temp%\temp.csv >>"'+@filepath+'"'
	exec   master..xp_cmdshell   @s ,no_output 
	--ɾ��tempĿ¼�µ�csv�ļ�
	exec   master..xp_cmdshell   'del %temp%\temp.csv' ,no_output 
	--����ִ�н��
	set @re=1 --�������ִ����һ�����֮ǰ�����û�б���
go

--���ô洢����exportUserAnsawer
 --F:\Data\data.csv
declare @w int
exec ѧ��������������..exportUserAnsawer 5, 'F:\Data\data.csv' ,@w output
--PRINT 'ִ�н����'+CONVERT(varchar(20),@w)
select @w as '����ֵ'


