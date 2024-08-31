import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
  `;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  `;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    checkInDate:startDate,
    checkOutDate:endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    Guests: { fullName: guestName, email },
    Cabins: { name: cabinName },
  },
}) {
  
  const {isCheckingOut, updateCheckout}  = useCheckout();
  const {isloading:isDeleting, deleteBook} = useDeleteBooking();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const start = new Date(startDate);
  const end = new Date(endDate);

  console.log("bookingIdasdjdoasj",bookingId);
  function handleCheckIn() {
    navigate(`/checkin/${bookingId}`)
  }  

  function handleCheckout() {
    updateCheckout(bookingId);
  }

  function handleDelete() {
    console.log("delete called");
    deleteBook(bookingId);
  }

   return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(start, "MMM dd yyyy")} &mdash;{" "} 
          {format(end, "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status || "unconfirmed"]}>
        {status !== null ? status.replace("-", "") : "unconfirmed"}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>

      <Menus.Menu>
          <Menus.Toggle id={bookingId}>
           </Menus.Toggle>
          <Menus.List id={bookingId}>
            <Menus.Button icon={<HiEye></HiEye>} onClick={()=> navigate(`/bookings/${bookingId}`)}>
              Details
            </Menus.Button>
            {
              status === "unconfirmed" && 
            <Menus.Button icon={<HiArrowDownOnSquare></HiArrowDownOnSquare>} disabled={isCheckingOut} onClick={handleCheckIn}>
              Check In
            </Menus.Button>
            }
            {
              status === "checked-in" && 
            <Menus.Button icon={<HiArrowUpOnSquare></HiArrowUpOnSquare>} onClick={handleCheckout}>
              Check Out
            </Menus.Button>
            }
            {
              status !== "checked-in" &&
              <Modal.Open opens="delete">             
                <Menus.Button icon={<HiTrash></HiTrash>}>Delete</Menus.Button>
              </Modal.Open> 

            }
          </Menus.List>          
        </Menus.Menu>
        <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={handleDelete}></ConfirmDelete>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
