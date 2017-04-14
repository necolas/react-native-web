const getAccessibilityRole = ({
  accessibilityComponentType,
  accessibilityRole,
  accessibilityTraits
}) => {
  if (accessibilityRole) {
    return accessibilityRole;
  } else if (accessibilityComponentType === 'button' || accessibilityTraits === 'button') {
    return 'button';
  }
};

module.exports = getAccessibilityRole;
