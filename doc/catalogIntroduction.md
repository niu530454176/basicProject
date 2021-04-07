### 文档目录
#### views
##### home  首页
1.dataMarket  数据大盘
* dataMarket/child  数据大盘•子
* dataMarket/employeePortrait  员工画像
---
2.parkManagement  载体管理
* parkManagement/area  区域管理
* parkManagement/xintuoVector  新拓载体
* parkManagement/space  空间管理
---
3.contract  合同管理
* contract/strategicServiceAgreement  战略服务协议管理
* contract/purchaseContract  采购合同管理
* contract/purchaseContract  采购合同管理
* contract/salesContract  销售合同管理
---
4.externalResources  外部资源管理
* externalResources/enterpriseCustomerManagement  企业客户管理
* externalResources/governmentCooperativeEnterpriseManagement  政府合作企业管理
* externalResources/supplierManagement  供应商管理
* externalResources/regionalCollaboration  区域协同
* externalResources/satisfactionSurvey  满意度调查
---
### 答题类客户customerType  对应
* 1 => 政府类客户
* 2 => 企业客户
* 3 => 供应商管理
* 4 => 个人客户
* 5 => 其它

##### 路由返回参数显示
```$xslt
vue 实例中截取上一页面参数 {query}
  beforeRouteEnter (to, from, next){
    query = from.query
    next()
  },
```
##### 文件存储目录  
1. supplier  供应商
2. strategicServiceAgreement 战略合作协议
3. contractSalesContract 应收类合同管理
4. organization 组织架构
