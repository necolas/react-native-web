import AutoCapitalize from './examples/AutoCapitalize';
import BlurOnSubmit from './examples/BlurOnSubmit';
import ClearButtonMode from './examples/ClearButtonMode';
import ClearTextOnFocus from './examples/ClearTextOnFocus';
import Disabled from './examples/Disabled';
import Editable from './examples/Editable';
import KeyboardType from './examples/KeyboardType';
import MaxLength from './examples/MaxLength';
import Multiline from './examples/Multiline';
import NumberOfLines from './examples/NumberOfLines';
import OnSelectionChange from './examples/OnSelectionChange';
import OnSelectionChangeControlled from './examples/OnSelectionChangeControlled';
import Placeholder from './examples/Placeholder';
import PlaceholderTextColor from './examples/PlaceholderTextColor';
import SecureTextEntry from './examples/SecureTextEntry';
import SelectTextOnFocus from './examples/SelectTextOnFocus';

export default function TextInputPage() {
  return (
    <>
      <AutoCapitalize />
      <BlurOnSubmit />
      <ClearButtonMode />
      <ClearTextOnFocus />
      <Disabled />
      <Editable />
      <KeyboardType />
      <MaxLength />
      <Multiline />
      <NumberOfLines />
      <OnSelectionChange />
      <OnSelectionChangeControlled />
      <Placeholder />
      <PlaceholderTextColor />
      <SecureTextEntry />
      <SelectTextOnFocus />
    </>
  ); 
}
