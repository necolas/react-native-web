/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Alert
 * @flow
 */

type Buttons = Array<{
  text?: string,
  onPress?: ?Function
}>;

type Options = {
  cancelable?: ?boolean,
  onDismiss?: ?Function
};

const createContainer = options => {
  const container: HTMLElement = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.backgroundColor = 'rgba(0,0,0,0.6)';
  container.onclick = () => {
    if (options && options.cancelable === false) {
      return;
    }
    if (options && options.onDismiss) {
      options.onDismiss();
    }
    container.remove();
  };
  return container;
};

const createMessageBox = () => {
  const box: HTMLElement = document.createElement('div');
  box.style.width = '100%';
  box.style.margin = '15px';
  box.style.padding = '15px';
  box.style.backgroundColor = 'white';
  box.style.maxWidth = '300px';
  box.style.fontSize = '14px';
  // Clicking message box should not trigger onDismiss
  box.onclick = event => event.stopPropagation();
  return box;
};

const createTitleDiv = title => {
  const titleDiv: HTMLHeadingElement = document.createElement('h2');
  titleDiv.textContent = title || '';
  titleDiv.style.marginTop = '0';
  titleDiv.style.fontSize = '20px';
  return titleDiv;
};

const createButtonsContainer = () => {
  const buttonsContainer: HTMLElement = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'space-between';
  buttonsContainer.style.alignItems = 'center';
  buttonsContainer.style.marginTop = '15px';
  return buttonsContainer;
};

const createButton = button => {
  const buttonElement: HTMLButtonElement = document.createElement('button');
  buttonElement.textContent = button.text ? button.text : '';
  buttonElement.style.color = '#3897fe';
  buttonElement.style.backgroundColor = 'transparent';
  buttonElement.style.border = 'none';
  buttonElement.style.textTransform = 'uppercase';
  buttonElement.style.cursor = 'pointer';
  buttonElement.style.fontSize = '14px';
  buttonElement.style.fontWeight = '500';
  return buttonElement;
};

const alert = (
  title: ?string,
  message: ?string,
  buttons: ?Buttons = [{ text: 'OK' }],
  options: ?Options = { cancelable: true }
) => {
  /**
   * Alert dialog is a plain DOM element instead of a React element.
   * It's not a React element because this is a static method.
   */
  const container = createContainer(options);
  const box = createMessageBox();
  const titleDiv = createTitleDiv(title);
  const messageDiv = document.createTextNode(message || '');
  const buttonsContainer = createButtonsContainer();
  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');

  container.appendChild(box);
  box.appendChild(titleDiv);
  box.appendChild(messageDiv);
  box.appendChild(buttonsContainer);
  buttonsContainer.appendChild(leftContainer);
  buttonsContainer.appendChild(rightContainer);

  buttons &&
    buttons.forEach((button, index, array) => {
      const isNeutralButton = array.length === 3 && index === 0;
      const buttonElement = createButton(button);
      buttonElement.onclick = () => {
        button.onPress && button.onPress();
        container.remove();
      };
      if (isNeutralButton) {
        leftContainer.appendChild(buttonElement);
      } else {
        rightContainer.appendChild(buttonElement);
      }
    });

  document.body && document.body.appendChild(container);
};

export default { alert };
