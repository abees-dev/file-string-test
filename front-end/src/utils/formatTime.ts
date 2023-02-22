export const getMinutesBetween = (expired: number) => {
  const diff = new Date(expired).getTime() - new Date().getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  return minutes;
};
