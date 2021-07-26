const getColumnClassName = (width: number): string => {
  return width > 12 ? `col-1` : `col-${width}`;
};

export { getColumnClassName };
