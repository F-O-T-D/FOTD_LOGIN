import { StyleSheet, Text, View } from 'react-native';
import { BACKCARROT } from '../Colors';

const ListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>List</Text>
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

export default ListScreen;
