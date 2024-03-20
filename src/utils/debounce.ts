export const debounce = (cb: (...arg: any) => void, time: number) => {
  let t: any;

  return (...arg: any) => {
    clearTimeout(t);
    t = setTimeout(() => {
      cb(...arg);
    }, time);
  };
};
