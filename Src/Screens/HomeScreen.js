import { StyleSheet, Text, View } from 'react-native';
import { BACKCARROT } from '../Colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKCARROT,
  },
});

export default HomeScreen;
