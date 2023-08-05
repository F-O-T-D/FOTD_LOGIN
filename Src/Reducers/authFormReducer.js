export const initAuthForm = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  disabled: true,
  isLoading: false,
  user: null,
};

export const AuthFormTypes = {
  UPDATE_FORM: 'update_form',
  TOGGLE_LOADING: 'toggle_loading',
  RESET: 'reset',
  SET_USER: 'set_user',
};

export const authFormReducer = (state, action) => {
  switch (action.type) {
    case AuthFormTypes.UPDATE_FORM:
      return { ...state, ...action.payload };
    case AuthFormTypes.TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case AuthFormTypes.RESET:
      return initAuthForm;
    case AuthFormTypes.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
