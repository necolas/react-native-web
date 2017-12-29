/**
 * @flow
 */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const AsyncStorageScreen = () => (
  <UIExplorer title="AsyncStorage" url="2-apis/AsyncStorage">
    <Description>
      <AppText>
        AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage system
        that is global to the domain. It's a facade over, and should be used instead of{' '}
        <Code>window.localStorage</Code> to provide an asynchronous API and multi functions. Each
        method returns a <Code>Promise</Code> object.
      </AppText>
      <AppText>
        It is recommended that you use an abstraction on top of <Code>AsyncStorage</Code> instead of{' '}
        <Code>AsyncStorage</Code> directly for anything more than light usage since it operates
        globally.
      </AppText>
      <AppText>
        The batched functions are useful for executing a lot of operations at once, allowing for
        optimizations to provide the convenience of a single promise after all operations are
        complete.
      </AppText>
    </Description>

    <Section title="Methods">
      <DocItem
        description={
          <AppText>
            Erases all AsyncStorage. You probably don't want to call this - use
            <Code>removeItem</Code> or <Code>multiRemove</Code> to clear only your own keys instead.
            Returns a Promise object.
          </AppText>
        }
        name="static clear"
        typeInfo="function"
      />

      <DocItem
        description="Gets all known keys. Returns a Promise object."
        name="static getAllKeys"
        typeInfo=""
      />

      <DocItem
        description="Fetches the value of the given key. Returns a Promise object.."
        name="static getItem"
        typeInfo="(key: string) => {}"
      />

      <DocItem
        description="Merges existing value with input value, assuming they are stringified JSON. Returns a Promise object."
        name="static mergeItem"
        typeInfo="(key: string, value: string) => {}"
      />

      <DocItem
        description={
          <AppText>
            <Code>multiGet</Code> results in an array of key-value pair arrays that matches the
            input format of <Code>multiSet</Code>. Returns a Promise object.
          </AppText>
        }
        example={{
          code: 'multiGet(["k1", "k2"]) -> [["k1", "val1"], ["k2", "val2"]]'
        }}
        name="static multiGet"
        typeInfo="(keys: Array<string>) => {}"
      />

      <DocItem
        description={
          <AppText>
            multiMerge takes an array of key-value array pairs that match the output of{' '}
            <Code>multiGet</Code>. It merges existing values with input values, assuming they are
            stringified JSON. Returns a Promise object.
          </AppText>
        }
        name="static multiMerge"
        typeInfo="(keyValuePairs: Array<Array<string>>) => {}"
      />

      <DocItem
        description="Delete all the keys in the keys array. Returns a Promise object."
        name="static multiRemove"
        typeInfo="(keys: Array<string>) => {}"
      />

      <DocItem
        description={
          <AppText>
            <Code>multiSet</Code> takes an array of key-value array pairs that match the output of{' '}
            <Code>multiGet</Code>. Returns a Promise object.
          </AppText>
        }
        example={{
          code: 'multiSet([["k1", "val1"], ["k2", "val2"]]);'
        }}
        name="static multiSet"
        typeInfo="(keyValuePairs: Array<Array<string>>) => {}"
      />

      <DocItem
        description="Removes the value of the given key. Returns a Promise object."
        name="static removeItem"
        typeInfo="(key: string) => {}"
      />

      <DocItem
        description="Sets the value of the given key. Returns a Promise object."
        name="static setItem"
        typeInfo="(key: string, value: string) => {}"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('AsyncStorage', AsyncStorageScreen);
