export const imageHandle = (
  [file]: any,
  dispatch: any,
  setUser: ({}) => void
) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ({ target }) => {
    const image = target?.result || null;
    image && dispatch(setUser({ image }));
  };

  reader.readAsDataURL(file);
};
