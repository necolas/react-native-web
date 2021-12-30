import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, StyleSheet, Text, View, ReactRootView } from 'react-native';

import Example from '../../shared/example';

export function ChildWindowPage() {
  const [clicked, setClicked] = React.useState(false);

  function onClick() {
    setClicked(true);
  }

  return (
    <View style={styles.childItems}>
      <Button onPress={onClick} title="Click" />
      <Text>{clicked ? 'Clicked!' : 'Click this button!'}</Text>
    </View>
  );
}

export default function MultiWindowPage() {
  const [rootTagContainer, setRootTagContainer] = React.useState(undefined);

  const openWindow = () => {
    const childWindow = window.open('', 'Child window', 'left=100,top=100,width=640,height=480');

    const title = childWindow.document.createElement('title');
    title.innerText = 'Child Window';
    childWindow.document.head.appendChild(title);

    const rootTag = childWindow.document.createElement('div');
    rootTag.style.width = '100%';
    rootTag.style.height = '100%';
    rootTag.style.display = 'flex';
    rootTag.style.margin = '0';
    rootTag.style.padding = '0';
    childWindow.document.body.appendChild(rootTag);

    childWindow.addEventListener('beforeunload', () => {
      setRootTagContainer(undefined);
    });

    setRootTagContainer(rootTag);
  };

  const closeWindow = () => {
    setRootTagContainer(undefined);
  };

  return (
    <Example title="Multi root">
      <View>
        <Text>Child Window example</Text>
        <View style={styles.buttons}>
          <Button disabled={!!rootTagContainer} onPress={openWindow} title="Open window" />
          <Button disabled={!rootTagContainer} onPress={closeWindow} title="Close window" />
        </View>
        {rootTagContainer
          ? ReactDOM.createPortal(
              <ReactRootView rootTag={rootTagContainer}>
                <ChildWindowPage />
              </ReactRootView>,
              rootTagContainer
            )
          : undefined}
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: '5px'
  },
  childItems: {
    gap: '100px',
    flexGrow: 1
  }
});
