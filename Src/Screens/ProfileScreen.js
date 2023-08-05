import { Alert, StyleSheet, Text, View } from 'react-native';
import { useUserState } from '../Contexts/UserContext';
import { BACKCARROT, WHITE, PRIMARY } from '../Colors';
import MiniButton from '../Components/MiniButton';
import BottomButton from '../Components/BottomButton';
import React from 'react';
import axios from 'axios';

const ProfileScreen = () => {
  const [user, setUser] = useUserState();

  const handingDelete = async () => {
    Alert.alert('회원탈퇴', '정말로 회원을 탈퇴하시겠습니까?', [
      {
        text: '아니오',
        style: 'cancel',
      },
      {
        text: '네',
        onPress: async () => {
          try {
            const response = await axios.delete(
              `http://localhost:3000/api/user_table/delete/${user.user_id}`
            );

            if (response.data.success) {
              Alert.alert('회원탈퇴완료', '회원탈퇴가 완료되었습니다.');
              setUser({});
            } else {
              Alert.alert('오류', '회원탈퇴 중 오류가 발생했습니다.');
            }
          } catch (error) {
            Alert.alert('오류', '서버와 통신중 오류가 발생했습니다.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.headerText}>회원정보</Text>
        </View>
        <Text>이름 {user?.user_name}</Text>
        <Text>이메일 {user?.user_email}</Text>
        <View style={styles.minibox}>
          <View style={styles.buttonContainer}>
            <MiniButton title="로그아웃" onPress={() => setUser({})} />
          </View>
        </View>
      </View>
      <View style={styles.bottombox}>
        <BottomButton title="FAQ" onPress={() => {}} />
      </View>
      <View style={styles.bottombox}>
        <BottomButton title="회원탈퇴하기" onPress={handingDelete} />
      </View>
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
  box: {
    width: 350,
    height: 160,
    backgroundColor: WHITE,
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PRIMARY.DARK,
  },
  minibox: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 240,
  },
  buttonContainer: {
    width: 100,
  },
  bottombox: {
    width: 350,
    height: 60,
    backgroundColor: WHITE,
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  bottomboxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY.DARK,
  },
});

export default ProfileScreen;
