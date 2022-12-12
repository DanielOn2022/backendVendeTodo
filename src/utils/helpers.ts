

export const removeCommon = (first: any, second: any) => {
  const spreaded = [...first, ...second];
  return spreaded.filter(el => {
    return !(first.includes(el) && second.includes(el));
  })
};