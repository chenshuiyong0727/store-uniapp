// 简单的使用示例  
'use strict';  
const uniPush = uniCloud.getPushManager({appId:"__UNI__802B2EC"}) //注意这里需要传入你的应用appId  
exports.main = async (event, context) => {  
    return await uniPush.sendMessage({  
        "push_clientid": "3408414b728aa6639badef1c3a7d969a",     //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid  
        "force_notification":true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  
        "title": "通知栏显示的标题",      
        "content": "通知栏显示的内容",  
        "payload": {  
            "text":"体验一下uni-push2.0"  
        }   
    })  
};