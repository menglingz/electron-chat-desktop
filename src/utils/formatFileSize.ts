export function formatFileSize(bytes: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let size = bytes
    let unitIndex = 0
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
  
    // 保留两位小数，四舍五入
    size = Math.round(size * 100) / 100
  
    return `${size}${units[unitIndex]}`
  }
  