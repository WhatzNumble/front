const getCookie = (name: string) => {
  return document.cookie.split(';').some((c) => {
    return c.trim().startsWith(name + '=');
  });
};

const deleteCookie = (name: string, path?: string, domain?: string) => {
  console.log(getCookie(name));
  if (getCookie(name)) {
    console.log('!!');
    console.log(
      name +
        '=' +
        (path ? ';path=' + path : '') +
        (domain ? ';domain=' + domain : '') +
        ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
    );

    document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export { getCookie, deleteCookie };
