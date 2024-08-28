import { getToday } from "../utils/helpers";
import supabase from './supabaseClient';
import { PAGE_SIZE } from "../utils/constants";


export async function getBookings({filter, sortBy, page}) { 
  let query = supabase
    .from("bookings")
    .select("*, Cabins(name), Guests(fullName, email)",{count:"exact"});
  if (filter !== null){
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if(sortBy){
    query = query.order(sortBy.field, {
      ascending:sortBy.direction === "asc"
    });
  }

  console.log("query bookin",query);

  if(page){
    const from = (page - 1)*(PAGE_SIZE);
    const to = from + PAGE_SIZE -1;
    query = query.range(from, to)
  }

  
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("No booking found");
  }
  console.log('getBookingsdata',data, count);
  return {data, count};
}


export async function getBooking(id) {

  console.log("id ,",id);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, Cabins(*), Guests(*)")
    .eq("id", id)
    .single();

    console.log("data outtu id",data);
    
    if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, Guests(fullName)")
    .gte("checkInDate", date)
    .lte("checkInDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, Guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,checkInDate.eq.${getToday()}),and(status.eq.checked-in,checkOutDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  console.log("obj update function",obj, id);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
