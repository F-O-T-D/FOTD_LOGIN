import {
  Image,
  Keyboard,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../Components/TextButton';
import Input, { ReturnKeyTypes, InputTypes } from '../Components/Input';
import { useRef, useReducer } from 'react';
import Button from '../Components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../Components/SafeInputView';
import HR from '../Components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../Colors';
import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '../Reducers/authFormReducer';
import axios from 'axios';
import { useUserState } from '../Contexts/UserContext';

const SignUpScreen = () => {
  const [, setUser] = useUserState();

  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const emailRef = useRef();

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const nameRef = useRef();

  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  const updateForm = (payload) => {
    const newForm = { ...form, ...payload };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      newForm.password !== newForm.passwordConfirm ||
      !newForm.name;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      try {
        if (!isEmailValid(form.email)) {
          Alert.alert('유효한 이메일 형식이 아닙니다.');
        } else if (!isPasswordValid(form.password)) {
          Alert.alert('비밀번호는 6자리 이상이어야 합니다.');
        } else {
          const emailCheckResponse = await axios.get(
            `http://localhost:3000/api/user_table/checkEmail/${form.email}`
          );

          if (emailCheckResponse.data.exists) {
            Alert.alert('이미 가입된 이메일입니다.');
          } else {
            const response = await axios.post(
              'http://localhost:3000/api/user_table/insert',
              {
                user_name: form.name,
                user_email: form.email,
                user_password: form.password,
              }
            );
            if (response.data.success) {
              setUser(response.data.user);
              Alert.alert('회원가입 성공!', '로그인을 진행해주세요!', [
                {
                  text: '확인',
                  onPress: () => {
                    navigation.navigate('SignIn');
                  },
                },
              ]);
            } else {
              Alert.alert('회원가입 실패');
            }
          }
        }
      } catch (error) {
        Alert.alert('회원가입 오류');
      }
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
    }
  };

  return (
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>

        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <Input
            ref={nameRef}
            value={form.name}
            onChangeText={(text) => updateForm({ name: text.trim() })}
            inputType={InputTypes.NAME}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => emailRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Input
            ref={emailRef}
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => passwordRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Input
            ref={passwordConfirmRef}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            inputType={InputTypes.PASSWORD_CONFIRM}
            returnKeyType={ReturnKeyTypes.DONE}
            onSubmitEditing={onSubmit}
            styles={{ container: { marginBottom: 20 } }}
          />
          <Button
            title="회원가입"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{ container: { marginTop: 20 } }}
          />

          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />

          <TextButton title="로그인" onPress={navigation.goBack} />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    flexGrow: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SignUpScreen;
