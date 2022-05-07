const getCookie = (name: string) => {
  return document.cookie.split(';').some((c) => {
    return c.trim().startsWith(name + '=');
  });
};

function getCookie2(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const deleteCookie = (name: string, path?: string, domain?: string) => {
  console.log(getCookie(name));
  if (getCookie(name)) {
    console.log(
      name +
        '=' +
        (path ? ';path=' + path : '') +
        (domain ? ';domain=' + domain : '') +
        '; Expires=Thu, 01 Jan 1970 00:00:01 GMT'
    );

    document.cookie =
      name +
      '=' +
      (path ? ';path=' + path : '') +
      (domain ? ';domain=' + domain : '') +
      '; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

export { getCookie, deleteCookie };
