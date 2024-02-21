export const excerpt = (text: string, length?: number) => {
  const strLen = length || 80;
  if (text?.length > strLen) {
    return text.substring(0, length) + "...";
  }

  return text;
};

export const fileSizeInMB = (bytes: number) => {
  return (bytes / 1024 / 1024).toFixed(2);
};
