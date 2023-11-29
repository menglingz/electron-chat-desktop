export function textFormat(content: string) {
  // content 即粘贴过来的内容(html 或 纯文本), 将样式清除
  if (content == '' && !content) return '';
  var str = content;
  str = str.replace(/<xml>[\s\S]*?<\/xml>/gi, '');
  str = str.replace(/<style>[\s\S]*?<\/style>/gi, '');
  str = str.replace(/<\/?[^>]*>/g, '');
  str = str.replace(/[ | ]*\n/g, '\n');
  str = str.replace(/&nbsp;/gi, '');
  str = str.replace(/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/, '');
  str = str.trim();
  str = str.replace(/\n\s*/g, '<br/>');
  str = str.replace(/<p><br><br><\/p><p><br><\/p>/, '');
  return str;
}

// 输入框复制文本事件回调(将复制带样式的文本样式清空, 只保留纯文本)
export const handlePaste = (e: any) => {
  e.preventDefault();
  let text;
  let clp = (e.originalEvent || e).clipboardData;
  if (clp === undefined || clp === null) {
    text = window.clipboardData.getData('text') || '';
    if (text !== '') {
      if (window.getSelection) {
        var newNode = document.createElement('span');
        newNode.innerHTML = text;
        window.getSelection().getRangeAt(0).insertNode(newNode);
      } else {
        document.selection.createRange().pasteHTML(text);
      }
    }
  } else {
    text = clp.getData('text/plain') || '';
    if (text !== '') {
      document.execCommand('insertText', false, text);
    }
  }
};
