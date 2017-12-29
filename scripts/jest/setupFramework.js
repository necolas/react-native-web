/* eslint-env jasmine, jest */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import createSerializer from '../../packages/react-native-web/jest/createSerializer';
import { StyleSheet } from '../../packages/react-native-web/src';

const serializer = createSerializer(StyleSheet);

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
