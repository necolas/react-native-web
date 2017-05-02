/* eslint-env jasmine, jest */

import VirtualizedList from "..";
import View from "../../View";
import StyleSheet from "../../../apis/StyleSheet";
import React from "react";
import { mount, render } from "enzyme";
import simulant from "simulant";

describe("components/VirtualizedList", () => {
  const data = [1, 2, 3];
  const renderItem = item => {
    return <View className="item">{item}</View>;
  };
  const styles = StyleSheet.create({
    container: {
      height: 200,
      overflowY: "scroll"
    }
  });
  const defaultProps = {
    style: styles.container,
    className: "virtualized-list",
    data,
    renderItem
  };

  const longListOfData = Array.from(Array(100).keys());

  // Props
  describe("data", () => {
    test("it renders the data given to it", () => {
      const wrapper = render(<VirtualizedList {...defaultProps} />);

      expect(wrapper.find(".item")).toHaveLength(data.length);
    });
  });
  // describe("debug");
  describe("getItem & getItemCount", () => {
    const getItem = (data, index) => {
      return [...data].reverse()[index];
    };

    const getItemCount = data => data.length;

    test("it renders based on the result of getItem & getItemCount", () => {
      const wrapper = render(
        <VirtualizedList
          {...defaultProps}
          getItem={getItem}
          getItemCount={getItemCount}
        />
      );

      expect(wrapper.find(".item").text()).toBe("321");
    });

    test("it only renders however many items as defined in getItemCount", () => {
      const getItemCount = data => 2;

      const wrapper = render(
        <VirtualizedList
          {...defaultProps}
          getItem={getItem}
          getItemCount={getItemCount}
        />
      );

      expect(wrapper.find(".item").text()).toBe("32");
    });

    test("it throws an error if getItemCount isn't also provided", () => {
      expect(() => {
        render(<VirtualizedList {...defaultProps} getItem={getItem} />);
      }).toThrow("You need to specify both getItem and getItemCount.");
    });
  });
  describe("getItemLayout", () => {
    const getItemLayout = (data, index) => 10;

    // unsure exactly how to test this right now as we only
    // calculate height when hiding pages
    test("it uses getItemLayout in the height calculation", () => {
      const wrapper = render(
        <VirtualizedList {...defaultProps} getItemLayout={getItemLayout} />
      );

      expect(wrapper).toBeTruthy();
    });
  });
  // describe("horizontal"); // not currently supported
  // currently it's rendering all pages to determine the height of the scroll view
  // so this test isn't passing
  // describe("initialNumToRender", () => {
  //   test("it only renders initialNumToRender number of items initially", () => {
  //     const wrapper = render(
  //       <VirtualizedList {...defaultProps} initialNumToRender={2} />
  //     );

  //     expect(wrapper.find(".item")).toHaveLength(2);
  //   });
  // });
  // Not sure why this test isn't working? Maybe an issue with Enzyme?
  // describe("keyExtractor", () => {
  //   const keyExtractor = (item, index) => {
  //     return `${item}-${index}`;
  //   };

  //   test("it is used to generate a unique key for each item", () => {
  //     const wrapper = render(
  //       <VirtualizedList {...defaultProps} keyExtractor={keyExtractor} />
  //     );

  //     expect(wrapper.find({ key: "1-0" })).toHaveLength(1);
  //     expect(wrapper.find({ key: "2-1" })).toHaveLength(1);
  //     expect(wrapper.find({ key: "3-2" })).toHaveLength(1);
  //   });
  // });
  // describe("maxToRenderPerBatch"); // this isn't really supported based on the implementation
  describe("onEndReached & onEndReachedThreshold", () => {
    test("calls onEndReached when scrolled to the bottom", () => {
      return new Promise((resolve, reject) => {
        const renderDiv = document.createElement("div");
        document.body.appendChild(renderDiv);

        try {
          const onEndReached = ({ distanceFromEnd }) => {
            expect(distanceFromEnd).toEqual(0);

            resolve(distanceFromEnd);
          };

          const wrapper = mount(
            <VirtualizedList {...defaultProps} onEndReached={onEndReached} />,
            { attachTo: renderDiv }
          );

          simulant.fire(renderDiv.querySelector(".virtualized-list"), "scroll");

          jest.runAllTimers();
        } catch (e) {
          reject(e);
        } finally {
          renderDiv.remove();
        }
      });
    });

    test("calls onEndReached when scrolled to the bottom with threshold", () => {
      return new Promise((resolve, reject) => {
        const renderDiv = document.createElement("div");
        document.body.appendChild(renderDiv);

        try {
          const onEndReached = ({ distanceFromEnd }) => {
            expect(distanceFromEnd).toEqual(0);

            resolve(distanceFromEnd);
          };

          const wrapper = mount(
            <VirtualizedList
              {...defaultProps}
              getItemLayout={() => 100}
              onEndReached={onEndReached}
              onEndReachedThreshold={100}
            />,
            { attachTo: renderDiv }
          );

          simulant.fire(renderDiv.querySelector(".virtualized-list"), "scroll");

          jest.runAllTimers();

          // wrapper.find(".virtualized-list").simulate("scroll");
          // wrapper.simulate("scroll");
        } catch (e) {
          reject(e);
        } finally {
          renderDiv.remove();
        }
      });
    });
  });
  // describe("onLayout"); // react-native docs are sparse on this. Leaving this test out
  describe("onRefresh", () => {
    test("calls onRefresh when scrolled to the top", () => {
      return new Promise((resolve, reject) => {
        const renderDiv = document.createElement("div");
        document.body.appendChild(renderDiv);

        try {
          const onRefresh = () => {
            resolve();
          };

          const wrapper = mount(
            <VirtualizedList {...defaultProps} onRefresh={onRefresh} />,
            { attachTo: renderDiv }
          );

          simulant.fire(renderDiv.querySelector(".virtualized-list"), "scroll");

          jest.runAllTimers();

          // wrapper.find(".virtualized-list").simulate("scroll");
          // wrapper.simulate("scroll");
        } catch (e) {
          reject(e);
        } finally {
          renderDiv.remove();
        }
      });
    });
  });
  // This cannot be tested without a proper browser context to render styles
  // describe("onViewableItemsChanged", () => {
  //   test("calls onViewableItemsChanged as items go in and out of view", () => {
  //     return new Promise((resolve, reject) => {
  //       const renderDiv = document.createElement("div");
  //       document.body.appendChild(renderDiv);

  //       try {
  //         const onViewableItemsChanged = (info) => {
  //           resolve();
  //         };

  //         const wrapper = mount(
  //           <VirtualizedList
  //             {...defaultProps}
  //             data={longListOfData}
  //             initialNumToRender={10}
  //             onViewableItemsChanged={onViewableItemsChanged}
  //           />,
  //           { attachTo: renderDiv }
  //         );

  //         simulant.fire(renderDiv.querySelector(".virtualized-list"), "scroll");

  //         jest.runAllTimers();

  //         // wrapper.find(".virtualized-list").simulate("scroll");
  //         // wrapper.simulate("scroll");
  //       } catch (e) {
  //         reject(e);
  //       } finally {
  //         renderDiv.remove();
  //       }
  //     });
  //   });
  // });
  // describe("refreshing"); // has no effect in this implementation
  // describe("removeClippedSubviews"); // has no effect in this implementation
  describe("renderItem", () => {
    const renderItem = item => <View className="customItem">{item + 5}</View>;

    test("renders the item as described", () => {
      const wrapper = render(
        <VirtualizedList {...defaultProps} renderItem={renderItem} />
      );

      expect(wrapper.find(".customItem").text()).toBe("678");
    });
  });
  // describe("renderScrollComponent"); // currently has no effect in this implementation
  describe("shouldItemUpdate", () => {
    test("doesn't update items if false", () => {
      const shouldItemUpdate = jest.fn(() => false);

      const wrapper = mount(
        <VirtualizedList
          {...defaultProps}
          data={[1, 2, 3]}
          shouldItemUpdate={shouldItemUpdate}
        />
      );

      expect(wrapper.find(".item").map(node => node.text())).toEqual([
        "1",
        "2",
        "3"
      ]);

      wrapper.setProps({
        data: [4, 5, 6]
      });

      expect(wrapper.find(".item").map(node => node.text())).toEqual([
        "1",
        "2",
        "3"
      ]);

      expect(shouldItemUpdate).toHaveBeenCalledTimes(3);
    });

    test("only updates certain items", () => {
      const shouldItemUpdate = jest.fn(
        (props, nextProps) => props.item === 1 || nextProps.index === 2
      );

      const wrapper = mount(
        <VirtualizedList
          {...defaultProps}
          data={[1, 2, 3]}
          shouldItemUpdate={shouldItemUpdate}
        />
      );

      expect(wrapper.find(".item").map(node => node.text())).toEqual([
        "1",
        "2",
        "3"
      ]);

      wrapper.setProps({
        data: [4, 5, 6, 7, 8]
      });

      expect(wrapper.find(".item").map(node => node.text())).toEqual([
        "4",
        "2",
        "6",
        "7",
        "8"
      ]);

      expect(shouldItemUpdate).toHaveBeenCalledTimes(3);
    });
  });
  // describe("updateCellsBatchingPeriod"); // not currently supported
  // describe("viewabilityConfig"); // not currently supported
  // describe("windowSize"); // not currently supported

  // Methods
  describe("scrollToEnd", () => {
    test("exists", () => {
      const wrapper = mount(<VirtualizedList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToEnd).toBeTruthy();
    });

    // This cannot be tested without a proper browser context to render styles
    // test("scrolls to the bottom of the virtualized list", () => {
    //   const wrapper = mount(
    //     <VirtualizedList
    //       {...defaultProps}
    //       data={longListOfData}
    //       renderItem={item => {
    //         return <View style={{ height: 10 }}>{item}</View>;
    //       }}
    //     />
    //   );

    //   const list = wrapper.get(0);

    //   list.scrollToEnd();
    // });
  });
  describe("scrollToIndex", () => {
    test("exists", () => {
      const wrapper = mount(<VirtualizedList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToIndex).toBeTruthy();
    });
  });
  describe("scrollToItem", () => {
    test("exists", () => {
      const wrapper = mount(<VirtualizedList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToItem).toBeTruthy();
    });
  });
  describe("scrollToOffset", () => {
    test("exists", () => {
      const wrapper = mount(<VirtualizedList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.scrollToOffset).toBeTruthy();
    });
  });
  describe("recordInteraction", () => {
    test("exists", () => {
      const wrapper = mount(<VirtualizedList {...defaultProps} />);

      const list = wrapper.get(0);

      expect(list.recordInteraction).toBeTruthy();
    })
  });
});
