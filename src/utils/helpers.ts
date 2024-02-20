export const excerpt = (text: string, len?: number) => {
  const strLen = len || 80;
  if (text?.length > strLen) {
    return text.substring(0, len) + "...";
  }

  return text;
};

export const fileSizeInMB = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2);
};
