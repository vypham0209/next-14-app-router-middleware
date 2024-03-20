function parseCookieToObject() {
  const cookie = document.cookie;
  return cookie.split(';').reduce((acc, curr) => {
    const [key, value] = curr.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

const cookiesFactory = () =>
  ({
    isWindow: typeof window !== 'undefined',
    cookies: typeof window !== 'undefined' ? parseCookieToObject() : {},
  } as {
    isWindow: true;
    cookies: Record<string, string>;
  });

const cookieHandler = {
  get: (key: string) => {
    const cookiesInstance = cookiesFactory();
    return cookiesInstance.cookies[key] ||"";
  },
  set: (key: string, value: string) => {
    document.cookie = `${key}=${value}; path=/;`;
  },
  remove: (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};

export default cookieHandler;
