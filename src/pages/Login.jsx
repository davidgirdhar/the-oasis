import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return( 
  <LoginLayout>
  <div className="flex flex-col items-center gap-5">
    <Logo></Logo>
    <Heading as="h3">Login in to The Oasis </Heading>
  </div>
    <LoginForm>
    </LoginForm>
  </LoginLayout>
  );
}

export default Login;
