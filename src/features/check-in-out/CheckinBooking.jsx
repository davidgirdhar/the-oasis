import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBookingId } from "../bookings/useBookingId";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const {booking, isPending} = useBookingId(); 
  const [confirmPaid, setConfirmPaid] = useState(false);
  const {isUpdating, updateCheckin} = useCheckin();
  const [addBreakfast, setaddbreakfast] = useState();
  const {isPending:isLoadingSetting, settings} = useSettings();

  // const {isPaid = false} = booking || {}; 
  const moveBack = useMoveBack();
  useEffect(function () {
    setConfirmPaid(booking?.isPaid ?? false);
    setaddbreakfast(booking?.hasBreakfast ?? false)   
  },[booking?.isPaid, booking?.hasBreakfast]);
  
  if(isPending || isUpdating || isLoadingSetting) return <Spinner></Spinner>

  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  let optionalBreakfastPrice;
  if(!isLoadingSetting) optionalBreakfastPrice = settings.breakfastPrice* numGuests; 
  
  function handleCheckin() {
    
    if(addBreakfast){
      let breakfast = {
        hasBreakfast:addBreakfast,
        totalPrice:optionalBreakfastPrice + totalPrice,
        extrasPrice:optionalBreakfastPrice      
      }
      console.log("breakfast",breakfast, bookingId);
      updateCheckin({bookingId, breakfast});
    }
    else{
      updateCheckin({bookingId, breakfast : {}});
    }
  }



  // console.log("CheckinBooking",booking);


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {
        <Box>
          <Checkbox disabled={hasBreakfast === true} onChange={()=>{
            setaddbreakfast(!addBreakfast)
            setConfirmPaid(!confirmPaid)
            }} checked={addBreakfast}>
            Want to include breakFast {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      }
      <Box>
        <Checkbox disabled={confirmPaid} checked={confirmPaid} onChange={()=>setConfirmPaid(!confirmPaid)}>Has {Guests.fullName} paid for the total amount of {!addBreakfast ? formatCurrency(totalPrice) : formatCurrency(totalPrice + optionalBreakfastPrice) }. </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>Check in booking #{bookingId} </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
