// chatGPT's version of the file downloader
export function downloadFile(data: string, fileName: string) {
  const blob = new File([data], fileName, { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
