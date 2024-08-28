import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { getBookings } from "../../services/apiBookings";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const {isPending, bookings, count} = useBooking();
  console.log('bookings',bookings);
  
  if (bookings.length === 0) return (<Empty resource="Bookings"></Empty>)
  if(isPending) return (<Spinner></Spinner>)

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer><Pagination count={count}></Pagination></Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
