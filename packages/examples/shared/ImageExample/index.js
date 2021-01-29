import DefaultSource from './examples/DefaultSource';
import Draggable from './examples/Draggable';
import OnError from './examples/OnError';
import OnLoad from './examples/OnLoad';
import OnLoadEnd from './examples/OnLoadEnd';
import OnLoadStart from './examples/OnLoadStart';
import ResizeMode from './examples/ResizeMode';
import Source from './examples/Source';
import StyleBoxShadow from './examples/StyleBoxShadow';
import StyleTintColor from './examples/StyleTintColor';

import StaticGetSize from './examples/StaticGetSize';
import StaticPrefetch from './examples/StaticPrefetch';

export default function ImageExample() {
  return (
    <>
      <DefaultSource />
      <Draggable />
      <OnError />
      <OnLoad />
      <OnLoadEnd />
      <OnLoadStart />
      <ResizeMode />
      <Source />
      <StyleBoxShadow />
      <StyleTintColor />
      <StaticGetSize />
      <StaticPrefetch />
    </>
  );
}
