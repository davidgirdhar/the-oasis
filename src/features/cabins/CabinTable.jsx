import { useQueries, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {fetchCabins} from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


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


const dynamicCompare = (property, order = 'asc') => {
  return (a, b) => {
      if (a[property] < b[property]) {
          return order === 'asc' ? -1 : 1;
      }
      if (a[property] > b[property]) {
          return order === 'asc' ? 1 : -1;
      }
      return 0;
  };
};





function CabinTable() {

  const {isPending, cabins} = useCabin();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const SortValue = searchParams.get("sortBy") || "name-asc";

  console.log('filterValue',filterValue);
  let filterCabins = cabins;


  if(!isPending){
    switch (filterValue) {
      case "all":
        filterCabins = cabins;
        break;
      case "no-discount":
        filterCabins = cabins.filter((cab)=>cab.discount === 0);
        break;
      case "with-discount":
        filterCabins = cabins.filter((cab)=>cab.discount > 0);
        break;
      default:
        filterCabins = cabins;
        break;
  
    }

    const [property,sortOrder] = SortValue.split('-');
    filterCabins.sort(dynamicCompare(property, sortOrder));
    
  }

  console.log("filterCabins",filterCabins);



  if(isPending){
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.1fr 0.1fr 0.1fr">
        <Table.Header>
          <div></div>
          <div>Cabin Name</div>
          {/* <div>Description</div> */}
          <div>Max Capacity</div>
          <div>Regular Price</div>
          <div>Discount</div>
          <div></div>

        </Table.Header>
        {

          <Table.Body data={filterCabins} render={(cab)=>
          (<CabinRow cabin={cab} key={cab.id}></CabinRow>)} ></Table.Body>
        }
          
      </Table>
    </Menus>
  )
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