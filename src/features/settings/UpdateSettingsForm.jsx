import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useEditSettings';
import { useSettings } from './useSettings';

function UpdateSettingsForm() {

  const {isPending, settings} = useSettings();
  const {isUpdating, editSetting} = useUpdateSetting();

  function handleUpdate(e, field){
    const {value} = e.target;
    console.log("value",value);
    if(!value) return;
    editSetting({[field]:value});
  } 


  return (
    <>
    {
      
      isPending ? <Spinner></Spinner> :

      <Form>
      <FormRow label='Minimum nights/booking'>
        <Input disabled={isPending} defaultValue={settings?.minBookingLength || 0} type='number' id='min-nights' onBlur={(e)=>handleUpdate(e, "minBookingLength")} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input disabled={isPending} defaultValue={settings?.maxBookingLength || 0} type='number' id='max-nights' onBlur={(e)=>handleUpdate(e, "maxBookingLength")} />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input disabled={isPending} defaultValue={settings.maxGuestPerBooking || 0} type='number' id='max-guests' onBlur={(e)=>handleUpdate(e, "maxGuestPerBooking")} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input disabled={isPending} defaultValue={settings.breakfastPrice || 0} type='number' id='breakfast-price' onBlur={(e)=>handleUpdate(e, "breakfastPrice")} />
      </FormRow>
    </Form>
    }
    </>
  )
}

export default UpdateSettingsForm;
