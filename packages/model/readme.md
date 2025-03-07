通过handler来让dom可以移动与resize

```js
/**
 *             循环  判断        赋值  计算     函数  结束 是基本计算逻辑
 * executeName loop  condition toBe  compute fn   return
 *
 * 循环允许次数（有限或者无限）遇到return 结束
 *
 * 感觉要拆分
 */
```

```json

{
    "definedExecute": [
    {
      "fnName": "alert name",
      "fn": "function (){xxx}"
    }
  ],
  "logics":[
    {
     "name": "chart_name",
     "id":"xxxxx",
      //该组件的事件优先级为1，例如涉及更新组件时优级为1，这个不对任务负责，
      "updatePriority": 1,
     "interval": 2000, //每次都会重新走一遍节点流程即eventTask自动执行的任务
      "subscription": {
        //订阅触发
        "subscriptionName": [
          {
            "name": "订阅1",
            "priority": 1,
            "executeCondition": "conditionALert", //本订阅的执行条件，不满足条件需要记录到log
            "executeName": "alert name" //任务函数错误直接结束并记录log
          }
        ]
      },
      "eventTask": [
        {
          //顺序为call ->execute
          "eventName": "clickName", //点击主动触发,不写就默认按照执行规则触发call和execute
          "isCatch": true,
          //所有二维数组的返回值都会被维护在组件内的一个值
          //如果执行[['a','a1'],['b'],['f']] 不传times则默认一次
          //在执行下一步前面之前所有的返回值都会记录
          //例如在b。可以查询的返回值为
          //顺序不一定
          //[{
          //  a:xxx,
          // a1:yyy
          //}]
          // f 时是
          //[{a:xxx,a1:yyy},{b:xxxx}]
          //所以允许反复执行，例如[['a'],['a']]，如果同级别任务名称重复，则返回记录值会覆盖先到的数据，会存在问题，所以会禁止并报错
          "call": [
            //这是一个优先队列
            {
              "name": "自执行订阅1",
              "priority": 1,
              "executeCondition": "condition1", // 任务开始执行条件
              "runTimes": 1, //本任务执行次数,正整数，负数不执行，浮点向上取整
              "executeName": "task1" //如果错误直接就结束
            }
          ], //任务编号,[[优先级最高，merge执行不分先后同时执行],[第一个全部执行且执行成功后执行]]，遇到错误根据isCatch可以被捕获

          "execute": [
            //这是一个优先队列
            {
              "name": "订阅1",
              "priority": 1,
              "runTimes": 1,
              "executeCondition": "condition1", // 任务开始执
              "repeatTime": 10, //如果不满足订阅执行条件之一被拒绝就会触发重试，不写或者0都表示不重试，重试不消费runTimes，runTimes表示的是成功后，如果runTimes是2第一次成功第二次失败就会触发10次重试，如果订阅任务复杂，可能存在多个订阅有一些执行了但是后面拒绝了，触发重试是从拒绝的那个函数还是继续而不是重头开始，直到完整结束消费一次runTimes。但是如果订阅函数抛出错误则直接结束，本次推送失败并记录log
              "executeName": "alert name"
            }
          ] //任务编号,[[优先级最高，merge执行不分先后同时执行],[第一个全部执行且执行成功后执行]]，遇到错误根据isCatch可以被捕获
        }
      ]
    }
  ]
}


{
  "blocks": [
    {
      "name": "chart_name",
      "parentGroupId": "parentId_xxx_xxx_xxx",
      "childrenGroupId": ["child_1_xxx", "child_2_xxx"],
      "groupId": "id_xxx_xxx_xxx",
      "configDrawPack": {
        "containerType": "rect", // figma里的形状
        "relativeCoordinate": [10, 10], //基于坐标系的相对位置
        "size": [100, 100],
        "anchor": {}, //形变锚点 待确定的数据，实际上锚点可以记录偏移量与角度或者索性不存在
      }, //一些的负责渲染的配置，不是数据，数据来源是任务

      //handler的权限
      "handlerPermission": 10,
      //节点block的权限
      "masterPermission": 10,


    }
  ],

}
```

事件通过发布订阅做
注册函数集functions
