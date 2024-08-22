import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import {useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import {useCreateCabin} from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({onCancel,CabintoEdit = {}}) {

  const {id:editId,...editValues} = CabintoEdit;
  const queryClient = useQueryClient();

  const isEditSession = Boolean(editId);
  // const {name, regularPrice, maxCapacity, image, discount, description} = CabintoEdit;
  // this is inbuilt functions react hook form provides
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues:isEditSession ? editValues : {},
    values: isEditSession ? editValues : {},
  });
  const {errors} = formState;

  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0]
    if(isEditSession){
      editCabin({newCabinData:{...data, image}, id:editId},{
        onSuccess: (data) => {
          console.log("eofydata",data);
          reset();
          onCancel();
        }

      })
    }
    else{
      createCabin({...data, image:image}
        ,{
        onSuccess: (data) => {
          reset(getValues());
          onCancel();
        }
      });

    }
    // createCabin(data);
    // mutate()
  }

  function onError(error) {
    console.log("err",error);
  }

  return (
    // call a function on submit
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCancel ? "modal":"regular"}> 
    <FormRow label="Cabin name" error={errors?.name?.message || ''} >
    <Input type="text" id="name" disabled={isWorking}  {...register(
          "name",{
            required:"This field is mandatory"
          }
        )}          
        />
    </FormRow>

    <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message || ''} >
    <Input type="number"  id="maxCapacity" disabled={isWorking} {...register(
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
    <Input type="number" id="regularPrice" disabled={isWorking} {...register(
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
    <Input type="number" id="discount" disabled={isWorking} {...register(
          "discount",{
            required:"This field is mandatory",
            validate: (value) => +(value) < +(getValues().regularPrice) || "Discount should be less than regular price"
          }
        )} defaultValue={0} />
    </FormRow>
      
      <FormRow label="Description for website" error={errors?.description?.message || ''}>
        <Textarea type="number" id="description" disabled={isWorking} {...register(
          "description",{
            required:"This field is mandatory"
          }
        )}  defaultValue="" />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message || ''}>
        <FileInput id="image" disabled={isWorking} {...register(
          "image",{
            required:isEditSession ? false : "This field is required"
          }
        )} 
        accept="image/*"
        
         />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCancel?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button  disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
