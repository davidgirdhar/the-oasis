import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> All cabins</Heading>
        <p><CabinTableOperations></CabinTableOperations></p>
      </Row>
      <Row>
        <CabinTable></CabinTable>
        <AddCabin></AddCabin>
      </Row>      
    </>

  );
}

export default Cabins;
