import classnames from 'classnames';
import emotionStyled from '@emotion/styled';
import { css as emotionCSS } from '@emotion/core';

import { getTheme } from './theme';
import { getUtils } from './utilities';
import htmlTags from './html-tags';

export const css = param => {
  return typeof param === 'function'
    ? emotionCSS(param({ theme: getTheme(), utils: getUtils() }))
    : emotionCSS(param);
};

export const styled = tagName => fn => {
  return emotionStyled(tagName)(props => {
    return typeof fn === 'function'
      ? fn({ props, theme: getTheme(), utils: getUtils() })
      : fn;
  });
};

htmlTags.forEach(tagName => {
  styled[tagName] = styled(tagName);
});

export const createStyles = fn => {
  return fn({ theme: getTheme(), utils: getUtils() });
};

export const createComponentStyles = fn => {
  return Object.entries(fn({ theme: getTheme(), utils: getUtils() })).reduce(
    (result, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = css(value);
      return result;
    },
    {},
  );
};

export const injectGlobal = styles => {
  let cssStyles =
    typeof styles === 'function'
      ? styles({ theme: getTheme(), utils: getUtils() })
      : styles;
  cssStyles = cssStyles.replace(/\n/g, '').replace(/ /g, '');

  const styleObject = document.createElement('style');
  styleObject.innerText = cssStyles;
  styleObject.setAttribute('data-source', '@diegofrayo/styles');

  document.getElementsByTagName('head')[0].appendChild(styleObject);
};

export const concatClassnames = (...rest) => {
  return classnames(...rest);
};
