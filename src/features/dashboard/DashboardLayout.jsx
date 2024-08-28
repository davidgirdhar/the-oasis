import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import { CgSpinner } from "react-icons/cg";
import Spinner from "../../ui/Spinner";
import { login } from "../../services/apiAuth";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const {isLoading, bookings} = useRecentBooking();
  const {isLoading:isStaysLoading, stays, confirmedStays, numDays} = useRecentStays();

  const {isPending:isCabinLoading, cabins} = useCabin()
  if(isLoading || isStaysLoading || isCabinLoading){
    return <Spinner></Spinner>;
  } 
  
  const numCabins = cabins.length;
  
  return (
    <StyledDashboardLayout> 
      <Stats bookings={bookings} confirmedStays={confirmedStays} numCabins={numCabins} numDays={numDays} ></Stats>
      <Today></Today>
      <DurationChart confirmedStays={confirmedStays}></DurationChart>
      <SalesChart bookings={bookings} numDays={numDays}></SalesChart>
    </StyledDashboardLayout>
  )
};

export default DashboardLayout;