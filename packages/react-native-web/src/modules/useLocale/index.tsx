/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import type { Nullable } from '../../types';
import { isLocaleRTL } from './isLocaleRTL';

type Locale = string;
type WritingDirection = 'ltr' | 'rtl';

type LocaleValue = {
  // Locale writing direction.
  direction: 'auto' | WritingDirection;
  // Locale BCP47 language code: https://www.ietf.org/rfc/bcp/bcp47.txt
  locale: Nullable<Locale>;
};

type ProviderProps = LocaleValue & {
  children: ReactNode;
};

const defaultLocale: LocaleValue = {
  direction: 'ltr',
  locale: 'en-US'
};

const LocaleContext = createContext<LocaleValue>(defaultLocale);

export function getLocaleDirection(locale: Locale): WritingDirection {
  return isLocaleRTL(locale) ? 'rtl' : 'ltr';
}

export function LocaleProvider(props: ProviderProps): ReactNode {
  const { direction, locale, children } = props;
  const needsContext = direction || locale;

  return needsContext ? (
    <LocaleContext.Provider
      children={children}
      value={{
        direction: locale ? getLocaleDirection(locale) : direction,
        locale
      }}
    />
  ) : (
    children
  );
}

export function useLocaleContext(): LocaleValue {
  return useContext(LocaleContext);
}
