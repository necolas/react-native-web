import PropTypes from "prop-types";

export default {
  ItemSeparatorComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element
  ]),
  ListFooterComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  ListHeaderComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  columnWrapperStyle: PropTypes.any,
  extraData: PropTypes.any,
  numColumns: PropTypes.number,
};
