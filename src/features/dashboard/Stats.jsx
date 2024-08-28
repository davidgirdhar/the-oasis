import { HiOutlineBriefcase, HiOutlineCalendar, HiOutlineCash, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineChartPie } from "react-icons/hi2";

function Stats({bookings, confirmedStays, numDays, numCabins}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const checkIns = confirmedStays.length

    const occupancy = confirmedStays.reduce((acc, curr) => curr.numNights + acc, 0);

    const numtotalAvailable = numCabins*numDays;
    
    const occupancyRate = (occupancy/numtotalAvailable*100).toFixed(0); 

    return (
        <>

        <Stat value={numBookings} icon={<HiOutlineBriefcase></HiOutlineBriefcase>} color="blue" title="Booking">
        </Stat>
        <Stat value={formatCurrency(sales)} icon={<HiOutlineCash></HiOutlineCash>} color="green" title="Sales">
        </Stat>
        <Stat value={checkIns} icon={<HiOutlineCalendar></HiOutlineCalendar>} color="green" title="CheckIns">
        </Stat>
        <Stat value={`${occupancyRate}%`}s icon={<HiOutlineChartBar></HiOutlineChartBar>} color="yellow" title="Occupancy Rate">
        </Stat>
        </>
    )

}


export default Stats;