export const downloadFile = async (url: string, fileName: string) => {
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: 'get',
    });

    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const aElement = document.createElement('a');
    aElement.href = href;
    aElement.setAttribute('download', fileName);
    aElement.setAttribute('target', '_blank');
    aElement.click();

    URL.revokeObjectURL(href);
  } catch (error) {
    console.log(error);
  }
};
