// 简单的使用示例  
'use strict';  
const uniPush = uniCloud.getPushManager({appId:"__UNI__802B2EC"}) //注意这里需要传入你的应用appId  
exports.main = async (event) => {  
	if(event && event.body){
		let obj = JSON.parse(event.body)
		const res = await uniPush.sendMessage({  
		"push_clientid": obj.cids, // 设备id，支持多个以数组的形式指定多个设备，如["cid-1","cid-2"]，数组长度不大于1000  
		"title": obj.title, // 标题  
		"content": obj.content, // 内容  
		"payload": obj.data, // 数据  
		"force_notification": true, // 服务端推送 需要加这一句  
		"request_id": obj.request_id ,//请求唯一标识号，10-32位之间；如果request_id重复，会导致消息丢失  
		"options":obj.options, //消息分类，没申请可以不传这个参数  
		})  
	}
};
// exports.main = async (event, context) => {  
//     return await uniPush.sendMessage({  
//         "push_clientid": "2fb0c974450af33c92dea5d07ce71082",     //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid  
//         "force_notification":true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  
//         "title": "上架提醒",      
//         "content": "上架通知，DC7695-200，尺码：38涨价420.00元，利润395.07元，请尽快上架",  
//         "payload": {  
//             "text":"上架通知，DC7695-200，尺码：38涨价420.00元，利润395.07元，请尽快上架"  
//         },
// 		"options": {
// 		  "HW": {
// 		    "/message/android/notification/importance":"NORMAL",
// 			"/message/android/notification/badge/class": "io.dcloud.PandoraEntry",
// 			"/message/android/notification/badge/set_num": 1
// 		  }
// 		}
//     })  
// };