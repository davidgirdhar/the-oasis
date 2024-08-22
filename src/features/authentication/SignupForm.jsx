import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const { errors } = formState;
  const {isloading, signUp} = useSignup();
  function onSubmit({email, password, fullName}) {

    signUp({email, password, fullName}, {
      onSettled:reset
    });
    // console.log("data",data);
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" disabled={isloading} id="fullName" {...register("fullName", {required:"This field is required"})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isloading} {...register("email", {required:"This field is required", pattern:{
          value:/\S+@\S+\.\S+/,
          message:"Provide a valid email address"
        }} )} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={isloading} {...register("password", {required:"This field is required" , minLength:{
          value:8,
          message:"Password should have minimum 8 characters"
        }})} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isloading} {...register("passwordConfirm", {required:"This field is required", validate:(value) => value === getValues().password || "Password needs to match"} )} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isloading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
