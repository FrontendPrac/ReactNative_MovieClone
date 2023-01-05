import React, { useEffect, useRef, useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import styled from "@emotion/native";
import { emailRegex, pwRegex, SCREEN_WIDTH } from "../../util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../../firebase";

const Login = ({ navigation: { goBack, setOptions } }) => {
  const isDark = useColorScheme() === "dark";

  // memory
  const emailRef = useRef(null);
  const pwRef = useRef(null);

  // cilent state
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 유효성 검사 로직
  const validateInputs = () => {
    if (!email) {
      alert("이메일을 입력해주이소");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("비밀번호를 입력해주이소");
      pwRef.current.focus();
      return true;
    }

    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일을 알맞게 입력해주이소");
      emailRef.current.focus();
      return true;
    }

    if (matchedPw === null) {
      alert("영문자, 숫자, 특수문자 섞어가 8자리 이상 입력해주이소");
      pwRef.current.focus();
      return true;
    }
  };

  // 로그인 로직
  const handleLogin = () => {
    if (validateInputs()) {
      return;
    }

    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("로그인 성공");
        setEmail("");
        setPw("");
        goBack();
      })
      .catch((err) => {
        console.log("error.message: ", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원가입을 먼저 해주이소");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호를 제대로 쳐주이소");
        }
      });
  };

  // 회원가입 로직
  const handleRegister = () => {
    if (validateInputs()) {
      return;
    }

    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("회원가입 성공");
        setEmail("");
        setPw("");
        goBack();
      })
      .catch((err) => {
        console.log("err.message: ", err.message);
        if (err.message.includes("already-in-use")) {
          alert("이미 사용중인 아이디인데예");
        }
      });
  };

  // 회원가입 화면의 우측 상단 로그인 버튼 없애기
  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <LoginContainer>
      <EmailInput
        ref={emailRef}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={DARK_COLOR}
        textContentType="emailAddress"
        placeholder="이메일"
      />
      <PwInput
        ref={pwRef}
        value={pw}
        onChangeText={(text) => setPw(text)}
        placeholderTextColor={DARK_COLOR}
        textContentType="password"
        returnKeyType="send"
        secureTextEntry={true}
        placeholder="비밀번호"
      />
      <LoginButton onPress={handleLogin}>
        <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>로그인</Text>
      </LoginButton>
      <RegisterButton onPress={handleRegister}>
        <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          회원가입
        </Text>
      </RegisterButton>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

const EmailInput = styled.TextInput`
  background-color: ${WHITE_COLOR};
  width: ${SCREEN_WIDTH / 1.5 + "px"};
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const PwInput = styled(EmailInput)``;

const LoginButton = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH / 1.5 + "px"};
  border-radius: 10px;
  background-color: grey;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const RegisterButton = styled(LoginButton)``;
