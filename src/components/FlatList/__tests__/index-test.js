/* eslint-env jasmine, jest */

import FlatList from "..";
import VirtualizedList from "../../VirtualizedList";
import View from "../../View";
import React from "react";
import { mount, render } from "enzyme";

describe("components/FlatList", () => {
  const data = [{ name: "1" }, { name: "2" }, { name: "3" }];
  const renderItem = ({ item, index }) => (
    <View className="item">{item.name}</View>
  );
  const defaultProps = { data, renderItem };

  // Props
  describe("ItemSeparatorComponent", () => {
    const SeparatorComponent = () => <View className="separator" />;

    test("renders the item between every list item", () => {
      const wrapper = render(
        <FlatList
          {...defaultProps}
          ItemSeparatorComponent={SeparatorComponent}
        />
      );

      expect(wrapper.find(".separator")).toHaveLength(2);
    });
  });
  describe("ListFooterComponent", () => {
    const FooterComponent = () => <View className="footer" />;

    test("renders 1 footer", () => {
      const wrapper = render(
        <FlatList {...defaultProps} ListFooterComponent={FooterComponent} />
      );

      expect(wrapper.find(".footer")).toHaveLength(1);
    });
  });
  describe("ListHeaderComponent", () => {
    const HeaderComponent = () => <View className="header" />;

    test("renders 1 header", () => {
      const wrapper = render(
        <FlatList {...defaultProps} ListHeaderComponent={HeaderComponent} />
      );

      expect(wrapper.find(".header")).toHaveLength(1);
    });
  });
  // describe("columnWrapperStyle"); // not supported
  // describe("numColumns"); // not supported

  // Methods
  describe("scrollToEnd", () => {
    test("exists", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToEnd).toBeTruthy();
    });

    test("calls the VirtualizedList scrollToEnd", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);
      const mockFn = jest.fn(list.listRef.scrollToEnd);

      list.listRef.scrollToEnd = mockFn;

      list.scrollToEnd();

      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe("scrollToIndex", () => {
    test("exists", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToIndex).toBeTruthy();
    });

    test("calls the VirtualizedList scrollToIndex", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);
      const mockFn = jest.fn(list.listRef.scrollToIndex);

      list.listRef.scrollToIndex = mockFn;

      list.scrollToIndex(10);

      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe("scrollToItem", () => {
    test("exists", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToItem).toBeTruthy();
    });

    test("calls the VirtualizedList scrollToItem", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);
      const mockFn = jest.fn(list.listRef.scrollToItem);

      list.listRef.scrollToItem = mockFn;

      list.scrollToItem(0);

      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe("scrollToOffset", () => {
    test("exists", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToOffset).toBeTruthy();
    });

    test("calls the VirtualizedList scrollToOffset", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);
      const mockFn = jest.fn(list.listRef.scrollToOffset);

      list.listRef.scrollToOffset = mockFn;

      list.scrollToOffset(0);

      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe("recordInteraction", () => {
    test("exists", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.recordInteraction).toBeTruthy();
    });

    test("calls the VirtualizedList recordInteraction", () => {
      const wrapper = mount(<FlatList {...defaultProps} />);

      const list = wrapper.get(0);
      const mockFn = jest.fn(list.listRef.recordInteraction);

      list.listRef.recordInteraction = mockFn;

      list.recordInteraction();

      expect(mockFn).toHaveBeenCalled();
    });
  });
});
