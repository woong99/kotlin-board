import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const navigate = useNavigate();

  const LoginFormInput = styled(Form.Control)`
    &:focus {
      border-color: black;
      box-shadow: none;
    }
  `;

  const goSignUp = () => {
    navigate('/sign-up');
  };
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
                  <FloatingLabel controlId="floatingInput" label="이메일">
                    <LoginFormInput type="email"></LoginFormInput>
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mt-4">
                    <LoginFormInput type="password"></LoginFormInput>
                  </FloatingLabel>
                </Form>
                <Button variant="outline-dark" className="w-100 mt-4" type="button" size="lg">
                  로그인
                </Button>
                <p className="text-center mt-2">
                  계정이 없으신가요?
                  <span
                    className="text-black-50 ms-2 text-decoration-underline pointer"
                    onClick={goSignUp}
                  >
                    회원가입
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

export default LoginPage;
