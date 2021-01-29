import DelayEvents from './examples/DelayEvents';
import Disabled from './examples/Disabled';
import FeedbackEvents from './examples/FeedbackEvents';
import PanAndPress from './examples/PanAndPress';

export default function PressablePage() {
  return (
    <>
      <DelayEvents />
      <Disabled />
      <FeedbackEvents />
      <PanAndPress />
    </>
  );
}
