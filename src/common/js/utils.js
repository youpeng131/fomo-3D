export const toDou = n => n < 10 ? '0' + n : '' + n;

export const cookies = {
     //读取cookie:字符串截取方法
     getCookie:function (c_name){
        if (document.cookie.length>0){
            let c_start=document.cookie.indexOf(c_name + "=");
            if(c_start!=-1){
                c_start=c_start + c_name.length+1;
                let c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) {c_end=document.cookie.length;}
                 return unescape(document.cookie.substring(c_start,c_end));
             }
         }
        return "";
    },
     //设置cookie--名称/值/过期天数
    setCookie:function(c_name,value,expiredays){
        let exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);//设置日期
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ';path=/';
    },
     //删除cookie
     delCookie:function(c_name){
         let exdate = new Date();
         exdate.setDate(exdate.getDate()-1);//昨天日期
         document.cookie = c_name+"=;expires="+exdate.toGMTString();
     }
};