const fileLoader = (file: File) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      res(reader.result);
    };
  });
};

export { fileLoader };
