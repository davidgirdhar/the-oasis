import { useQueries, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {fetchCabins} from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {

  const {isPending, cabins} = useCabin();

  if(isPending){
    return (
      <Spinner></Spinner>
    )
  }

  return (<Table role="table">
  <TableHeader role="row">
    <div></div>
    <div>Cabin Name</div>
    {/* <div>Description</div> */}
    <div>Max Capacity</div>
    <div>Regular Price</div>
    <div>Discount</div>
    <div></div>

  </TableHeader>
  {
    cabins.map((cab)=>
    <CabinRow cabin={cab} key={cab.id}></CabinRow>
    
    )
  }
    
  </Table>)
}


// {/* <tr>
//       <td>cab.name</td>
//       <td>cab.description</td>
//       <td>cab.image</td>
//       <td>cab.strength</td>
//       <td>cab.regularPrice</td>
//       <td>cab.discount</td>



//     </tr> */}
export default CabinTable;