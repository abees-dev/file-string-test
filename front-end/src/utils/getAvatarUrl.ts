export const getAvatarUrl = (url?: string) => {
  if (!url) return '';
  if (url.split('/')[1] === 'public') {
    return `${process.env.REACT_APP_UPLOAD_API_URL}${url}`;
  }
  return url;
};
