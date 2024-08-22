import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("simmi@example.com");
  const [password, setPassword] = useState("Pass@0123");
  const {isLoggin, logIn} = useLogin(); 
  
    function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) return;
    logIn({email, password},{
      onSettled:()=>{
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isLoggin}
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          disabled={isLoggin}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoggin} size="large"> {isLoggin ? <SpinnerMini></SpinnerMini> : "Login" }</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
