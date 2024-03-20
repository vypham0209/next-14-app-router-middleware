export function firstUpper(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function firstUpperAllLower(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function stringSplice(oriStr: string, start: number, delCount?: number, subStr?: string) {
  return oriStr.slice(0, start) + (subStr || '') + oriStr.slice(start + (delCount || 0));
}

const pipe =
  (f: Function, g: Function) =>
  (...args: any[]) =>
    g(f(...args));

const processBlockQuote = (str: string) => {
  return str.replace(
    /<blockquote>/g,
    '<blockquote class="relative"><img src="/img/rich-text/quote.svg" alt="" class="absolute top-5 dir-left-2 md:dir-left-5" />',
  );
};

const processList = (str: string) => {
  const list: string[] = [];
  let newStr = str;

  const ulOpenTag = '<ul';
  const ulCloseTag = '</ul>';
  const olOpenTag = '<ol';
  const olCloseTag = '</ol>';

  let indexOfUlStart = newStr.indexOf(ulOpenTag);
  let indexOfUlEnd = newStr.indexOf(ulCloseTag) + 5;
  let indexOfOlStart = newStr.indexOf(olOpenTag);
  let indexOfOlEnd = newStr.indexOf(olCloseTag) + 5;

  const processUl = () => {
    const length = list.length;
    let listStr = newStr.slice(indexOfUlStart, indexOfUlEnd);
    listStr = listStr.replace(/<li>/g, '<li><div class="wrapper">');
    listStr = listStr.replace(/<\/li>/g, '</div></li>');

    list.push(listStr.replace(/<li>/g, '<li><p class="bulleted"></p>'));

    newStr = stringSplice(
      newStr,
      indexOfUlStart,
      indexOfUlEnd - indexOfUlStart,
      `{{position-${length}}}`,
    );

    indexOfUlStart = newStr.indexOf(ulOpenTag);
    indexOfUlEnd = newStr.indexOf(ulCloseTag) + 5;
    indexOfOlStart = newStr.indexOf(olOpenTag);
    indexOfOlEnd = newStr.indexOf(olCloseTag) + 5;
  };

  const processOl = () => {
    const length = list.length;
    let listStr = newStr.slice(indexOfOlStart, indexOfOlEnd);
    listStr = listStr.replace(/<li>/g, '<li><div class="wrapper">');
    listStr = listStr.replace(/<\/li>/g, '</div></li>');

    let i = 0;
    list.push(listStr.replace(/<li>/g, () => `<li><p class="numbered">${++i}.</p>`));

    newStr = stringSplice(
      newStr,
      indexOfOlStart,
      indexOfOlEnd - indexOfOlStart,
      `{{position-${length}}}`,
    );

    indexOfUlStart = newStr.indexOf(ulOpenTag);
    indexOfUlEnd = newStr.indexOf(ulCloseTag) + 5;
    indexOfOlStart = newStr.indexOf(olOpenTag);
    indexOfOlEnd = newStr.indexOf(olCloseTag) + 5;
  };

  while (indexOfUlStart !== indexOfOlStart) {
    if (indexOfUlStart === -1) {
      processOl();
      continue;
    }

    if (indexOfOlStart === -1) {
      processUl();
      continue;
    }

    if (indexOfUlStart < indexOfOlStart) {
      processUl();
    } else {
      processOl();
    }
  }

  list.forEach((item, index) => {
    newStr = newStr.replace(`{{position-${index}}}`, item);
  });

  return newStr;
};

export const processHtml = pipe(processBlockQuote, processList);
