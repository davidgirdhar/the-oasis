import Filter from "../../ui/Filter";
import SortBy from "../../ui/Sortby";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations(params) {
  return(
    <TableOperations>
        <Filter filterField="discount" options={[
          {
            label:"All",
            value:"all"
          },
          {
            label:"With Discount",
            value:"with-discount"
          },
          {
            label:"No Discount",
            value:"no-discount"
          }
        ]}
        ></Filter>
        <SortBy options={
          [
            {
              value:"name-asc",
              label:"Sort by Name(A-Z)"
            },
            {
              value:"name-desc",
              label:"Sort by Name(Z-A)"
            },
            {
              value:"regularPrice-asc",
              label:"Sort by Price(Lowest First)"
            },
            {
              value:"regularPrice-desc",
              label:"Sort by Price(Hightest First)"
            },
            {
              value:"discount-asc",
              label:"Sort by Discount(Lowest First)"
            },
            {
              value:"discount-desc",
              label:"Sort by Discount(Hightest First)"
            },
            {
              value:"maxCapacity-asc",
              label:"Sort by maxCapacity(Lowest First)"
            },
            {
              value:"maxCapacity-desc",
              label:"Sort by maxCapacity(Hightest First)"
            }
            
          ]
        }>

        </SortBy>
    </TableOperations>
  )  
};

export default CabinTableOperations;