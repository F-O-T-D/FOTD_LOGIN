import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../Colors';

const BottomButton = ({ styles, title, onPress, hitSlop }) => {
  return (
    <Pressable
      style={styles?.button}
      hitSlop={hitSlop ? hitSlop : 10}
      onPress={onPress}
    >
      <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
    </Pressable>
  );
};

BottomButton.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  hitSlop: PropTypes.number,
};

const defaultStyles = StyleSheet.create({
  title: {
    color: PRIMARY.DARK,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default BottomButton;
