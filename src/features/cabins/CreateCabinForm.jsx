import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  // this is inbuilt functions react hook form provides
  const {register, handleSubmit, reset, getValues, formState} = useForm();

  const {errors} = formState;

  const {isloading, mutate} = useMutation({
    mutationFn:createCabin,
    onSuccess:()=>
      {
        toast.success("New Cabin succesfully created");
        queryClient.invalidateQueries({
          queryKey:["cabin"]
        });
        reset();
      },
      onError:(err)=>{
        toast.error(err.message);
      }
  });
  
  function onSubmit(data) {
    console.log("Data",data);
    
    // createCabin(data);
    mutate(data);
    // mutate()
  }

  function onError(error) {
    console.log("err",error);
  }

  return (
    // call a function on submit
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal"> 
    <FormRow label="Cabin name" error={errors?.name?.message || ''} >
    <Input type="text" id="name" disabled={isloading}  {...register(
          "name",{
            required:"This field is mandatory"
          }
        )}          
        />
    </FormRow>

    <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message || ''} >
    <Input type="number" id="maxCapacity" disabled={isloading} {...register(
          "maxCapacity",{
            required:"This field is mandatory",
            min:{
              value:1,
              message:"Capacity should be atleast 1"
            }
          }
        )} />
    </FormRow>

    <FormRow label="Regular price" error={errors?.regularPrice?.message || ''} >
    <Input type="number" id="regularPrice" disabled={isloading} {...register(
          "regularPrice",{
            required:"This field is mandatory",
            min:{
              value:1000,
              message:"Price should be atleast 1000"
            }
          }
        )}/>
    </FormRow>

    <FormRow label="Discount" error={errors?.discount?.message || ''} >
    <Input type="number" id="discount" disabled={isloading} {...register(
          "discount",{
            required:"This field is mandatory",
            validate: (value) => +(value) < +(getValues().regularPrice) || "Discount should be less than regular price"
          }
        )} defaultValue={0} />
    </FormRow>
      
      <FormRow label="Description for website" error={errors?.description?.message || ''}>
        <Textarea type="number" id="description" disabled={isloading} {...register(
          "description",{
            required:"This field is mandatory"
          }
        )}  defaultValue="" />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message || ''}>
        <FileInput id="image" disabled={isloading} {...register(
          "image",{
            required:"This field is required"
          }
        )} 
        accept="image/*"
        
         />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isloading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
