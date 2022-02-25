import React from 'react';
import { StyleSheet } from 'react-native';
import Example from '../../shared/example';
import { SectionList, Text, View } from 'react-native-web';

function makeItems(length) {
  return Array(length)
    .fill(0)
    .map((value, index) => ({
      key: `item_${index}`,
      title: `Item ${index}`
    }));
}

const sectionsData = [
  { data: makeItems(9), title: 'Section A', color: 'red', key: 'a' },
  { data: makeItems(6), title: 'Section B', color: 'green', key: 'b' },
  { data: makeItems(3), title: 'Section C', color: 'yellow', key: 'c' }
];

function renderItem({ item }) {
  return (
    <Text key={item.key} style={styles.itemTitleText}>
      {item.title}
    </Text>
  );
}

function renderSectionHeader({ section }) {
  const extraStyle = { backgroundColor: section.color };
  return (
    <Text key={`sh_${section.key}`} style={[styles.sectionHeaderText, extraStyle]}>
      {section.title}
    </Text>
  );
}

function renderSectionFooter({ section }) {
  const footerStyle = { height: 10, backgroundColor: section.color, marginBottom: 10 };
  return <View key={`sf_${section.key}`} style={footerStyle} />;
}

export default function SectionListPage() {
  return (
    <Example title="SectionList">
      <SectionList
        ListFooterComponent={
          <Text style={styles.examplesFooter}>(Example ListFooterComponent Here)</Text>
        }
        ListHeaderComponent={
          <Text style={styles.examplesHeader}>(Example ListHeaderComponent Here)</Text>
        }
        renderItem={renderItem}
        renderSectionFooter={renderSectionFooter}
        renderSectionHeader={renderSectionHeader}
        sections={sectionsData}
      />
    </Example>
  );
}

const styles = StyleSheet.create({
  examplesFooter: { fontSize: 22 },
  examplesHeader: { fontSize: 22, marginBottom: 20 },
  itemTitleText: { fontSize: 16 },
  sectionHeaderText: { fontSize: 20, fontWeight: 'bold' }
});
