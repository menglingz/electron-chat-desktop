// 空间动态时间的函数
export const year = (time: string): string => {
    const date = new Date(time);
    const year = date.getFullYear();
    return `${year}`;
}

export const month = (time: string): string => {
    const date = new Date(time);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${month}月`;
}

export const day = (time: string): string => {
    const date = new Date(time);
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}`;
}

export const hour = (time: string): string => {
    const date = new Date(time);
    const hour = String(date.getHours())
    return `${hour}`;
}

export const min = (time: string): string => {
    const date = new Date(time);
    const min = date.getMinutes()
    return `${String(min < 10 ? '0' + min : min)}`
}