/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Clipboard from '..';

describe('apis/Clipboard', () => {
  const originalExecCommand = Object.getOwnPropertyDescriptor(
    document,
    'execCommand'
  );
  const execCommand = jest.fn();

  beforeAll(() => {
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommand
    });
  });

  afterAll(() => {
    if (originalExecCommand == null) {
      delete document.execCommand;
    } else {
      Object.defineProperty(document, 'execCommand', originalExecCommand);
    }
  });

  afterEach(() => {
    execCommand.mockReset();
  });

  test.each([true, false])('returns the copy result (%s)', (result) => {
    const childCount = document.body.childNodes.length;
    execCommand.mockReturnValueOnce(result);

    expect(Clipboard.setString('copy me')).toBe(result);
    expect(execCommand).toHaveBeenCalledWith('copy');
    expect(document.body.childNodes.length).toBe(childCount);
    expect(window.getSelection().rangeCount).toBe(0);
  });

  test('returns false and cleans up when copying throws', () => {
    const childCount = document.body.childNodes.length;
    execCommand.mockImplementationOnce(() => {
      throw new Error('Copy is unavailable');
    });

    expect(Clipboard.setString('copy me')).toBe(false);
    expect(document.body.childNodes.length).toBe(childCount);
    expect(window.getSelection().rangeCount).toBe(0);
  });
});
