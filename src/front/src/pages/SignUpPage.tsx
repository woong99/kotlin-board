// import { useState } from 'react';
import { useCallback, useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginFormInput = styled(Form.Control)`
  &:focus {
    border-color: black;
    box-shadow: none;
  }
`;
const SignUpPage = () => {
  const navigate = useNavigate();

  //이메일, 비밀번호, 비밀번호 확인, 닉네임
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>(
    '2글자 이상 8글자 미만의 영어, 숫자, 한글로 구성되어야 합니다.',
  );

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isNickname, setIsNickname] = useState<boolean>(false);

  const goLoginPage = () => {
    navigate('/login');
  };

  // 이메일 유효성 검사
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex: RegExp =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent: string = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식에 맞게 입력해주세요.');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호 유효성 검사
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent: string = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('');
      setIsPassword(true);
    }

    if (passwordCurrent === passwordConfirm) {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm(false);
    }
  }, []);

  // 비밀번호 확인 유효성 검사
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent: string = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  // 닉네임 유효성 검사
  const onChangeNickname = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameCurrent: string = e.target.value;
    setNickname(nicknameCurrent);
    const nicknameRegex: RegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (
      nicknameCurrent.length < 2 ||
      nicknameCurrent.length > 8 ||
      !nicknameRegex.test(nicknameCurrent)
    ) {
      setNicknameMessage('2글자 이상 8글자 미만의 영어, 숫자, 한글로 구성되어야 합니다.');
      setIsNickname(false);
    } else {
      setNicknameMessage('');
      setIsNickname(true);
    }
  }, []);

  return (
    <div className="vh-100 d-flex align-items-center" style={{ backgroundColor: '#f7f9fa' }}>
      <Container>
        <Row className="justify-content-center h-100">
          <Col md={8} lg={7} xl={5}>
            <Card className="px-5 shadow" style={{ border: 'none' }}>
              <Card.Body>
                <div className="d-flex justify-content-center my-2">
                  <img src="/img/Kotlin_Icon.png" alt="kotlin" style={{ height: '4rem' }} />
                </div>
                <div>
                  <h2 className="text-center fw-bold text-uppercase fs-1">Kotlin-Board</h2>
                </div>
                <Form className="mt-5">
                  <FloatingLabel controlId="email" label="이메일">
                    <LoginFormInput
                      type="email"
                      onChange={onChangeEmail}
                      className={!isEmail && 'border-danger border'}
                    ></LoginFormInput>
                    <span className="fs-6 text-danger">{emailMessage}</span>
                  </FloatingLabel>
                  <FloatingLabel controlId="password" label="비밀번호" className="mt-4">
                    <LoginFormInput
                      type="password"
                      onChange={onChangePassword}
                      className={!isPassword && 'border-danger border'}
                    ></LoginFormInput>
                    <span className="fs-6 text-danger">{passwordMessage}</span>
                  </FloatingLabel>
                  <FloatingLabel controlId="rePassword" label="비밀번호 확인" className="mt-4">
                    <LoginFormInput
                      type="password"
                      onChange={onChangePasswordConfirm}
                      className={!isPasswordConfirm && 'border-danger border'}
                    ></LoginFormInput>
                    <span className="fs-6 text-danger">{passwordConfirmMessage}</span>
                  </FloatingLabel>
                  <FloatingLabel controlId="nickname" label="닉네임" className="mt-4">
                    <LoginFormInput
                      type="text"
                      onChange={onChangeNickname}
                      className={!isNickname && 'border-danger border'}
                    ></LoginFormInput>
                    <span className="fs-6 text-danger">{nicknameMessage}</span>
                  </FloatingLabel>
                </Form>
                <Button
                  variant={
                    isEmail && isPassword && isPasswordConfirm && isNickname
                      ? 'dark'
                      : 'outline-dark'
                  }
                  className="w-100 mt-4"
                  type="button"
                  size="lg"
                  disabled={isEmail && isPassword && isPasswordConfirm && isNickname ? false : true}
                >
                  회원가입
                </Button>
                <p className="text-center mt-2">
                  이미 계정이 있으신가요?
                  <span
                    className="text-black-50 ms-2 text-decoration-underline pointer"
                    onClick={goLoginPage}
                  >
                    로그인
                  </span>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;
