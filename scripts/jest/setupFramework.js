/* eslint-env jasmine, jest */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import serializer from './serializer';

Enzyme.configure({ adapter: new Adapter() });

// TODO: move off legacy serializer
expect.addSnapshotSerializer(serializer);
