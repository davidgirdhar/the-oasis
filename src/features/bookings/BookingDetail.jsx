import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingId } from "./useBookingId";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const {booking, isPending} = useBookingId();
  const {isCheckingOut, updateCheckout}  = useCheckout();
  const {isloading:isDeleting, deleteBook} = useDeleteBooking();

  // const booking = {};
  // const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isPending || isCheckingOut || isDeleting) return <Spinner></Spinner>

  if(!booking) return <Empty resource="Booking"></Empty>

  function handleCheckout() {
    updateCheckout(booking.id);
  }

  function handleDelete() {
    console.log("delete called");
    deleteBook(booking.id, {
      onSettled:()=>navigate(-1)
    });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {
        booking.status === "checked-in" && 
        <Button icon={<HiArrowUpOnSquare></HiArrowUpOnSquare>} onClick={handleCheckout}>
          Check Out
        </Button>
      }

      {
        booking.status === "unconfirmed" &&
        <Button icon={<HiArrowDownOnSquare></HiArrowDownOnSquare>} onClick={()=> navigate(`/checkin/${booking.id}`)}>
                Check In
              </Button>
      }
        <Modal>
            {
              booking.status !== "checked-in" &&
              <Modal.Open opens="delete">             
                <Button variation="danger" icon={<HiTrash></HiTrash>}>Delete</Button>
              </Modal.Open> 

            }
            <Modal.Window name="delete">
                  <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={handleDelete}></ConfirmDelete>
            </Modal.Window>
        </Modal>


        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
