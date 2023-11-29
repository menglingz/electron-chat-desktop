// 提取文件后缀名
export const extractExt = (fileName: string) => {
    return fileName.slice(fileName.lastIndexOf('.') + 1, fileName.length)
}