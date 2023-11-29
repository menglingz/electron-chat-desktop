// 格式化时间（根据传入时间，与当前时间相比得出几天前，几小时前，几分钟或者是刚刚）
//时间函数date格式为：xxxx-xx-xx xx:xx
export const formatMessageDate = (date: string) => {
    var newTime = Date.parse((new Date()) as any)  //获得当前时间，转化时间戳
    var interval = (newTime - new Date(date).getTime()) / 1000

    if (interval < 0) {
        return "刚刚"
    }
    else if (interval > 24 * 3600) {
        return getformatTime(new Date(date))
    }
    else if (interval > 3600) {
        return Math.round((interval / 3600)) + "小时前"
    }
    else if (interval > 60) {
        return Math.round((interval / 60)) + "分钟前"
    }
    else {
        return "刚刚"
    }
}

// 格式化时间（xxxx年xx月xx日 xx:xx）
function getformatTime(time: Date) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    const hour = time.getHours()
    const min = time.getMinutes()
    return `${year}-${month}-${day} ${hour}:${min}`
}