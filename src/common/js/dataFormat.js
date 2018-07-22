function dataFormat(time,formatStr){
    var nowDate = new Date(time);
    var str = formatStr;

    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, nowDate.getFullYear());
    str = str.replace(/yy|YY/, (nowDate.getYear() % 100) > 9 ? (nowDate.getYear() % 100).toString() : '0' + (nowDate.getYear() % 100));
    str = str.replace(/MM/, (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1).toString() : '0' + (nowDate.getMonth() + 1));
    str = str.replace(/M/g, (nowDate.getMonth() + 1));
    str = str.replace(/w|W/g, Week[nowDate.getDay()]);
    str = str.replace(/dd|DD/, nowDate.getDate() > 9 ? nowDate.getDate().toString() : '0' + nowDate.getDate());
    str = str.replace(/d|D/g, nowDate.getDate());
    str = str.replace(/hh|HH/, nowDate.getHours() > 9 ? nowDate.getHours().toString() : '0' + nowDate.getHours());
    str = str.replace(/h|H/g, nowDate.getHours());
    str = str.replace(/mm/, nowDate.getMinutes() > 9 ? nowDate.getMinutes().toString() : '0' + nowDate.getMinutes());
    str = str.replace(/m/g, nowDate.getMinutes());
    str = str.replace(/ss|SS/, nowDate.getSeconds() > 9 ? nowDate.getSeconds().toString() : '0' + nowDate.getSeconds());
    str = str.replace(/s|S/g, nowDate.getSeconds());
    return str;
}

export default dataFormat;