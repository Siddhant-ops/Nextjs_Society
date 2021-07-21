export const getImagePath = () => {
  let date = new Date().getDate();
  return `/static/Images/Saly-${date}.svg`;
};
