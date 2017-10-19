import Adapter from 'enzyme-adapter-react-16';
import createSerializer from './jest/createSerializer';
import Enzyme from 'enzyme';
import { StyleSheet } from './src';

const serializer = createSerializer(StyleSheet);

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
