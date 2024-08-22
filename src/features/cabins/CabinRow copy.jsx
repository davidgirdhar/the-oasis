import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { RxButton } from "react-icons/rx";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 0.2fr 0.2fr 0.2fr;
//   column-gap: 1.2rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({cabin}) {
    const [showForm, setShowForm] = useState(false); 

    const {isloading, deleteCabin} = useDeleteCabin();
    const {isCreating, createCabin} = useCreateCabin();


    function handleDuplicate() {

      createCabin({
        name:`copy of ${cabin.name}`,
        maxCapacity:cabin.maxCapacity,
        regularPrice:cabin.regularPrice,
        discount:cabin.discount,
        image:cabin.image,
        id:+(cabin.id) + Math.round(Math.random()*100), //random,
        description:cabin.description
      })

    }

    return (
        <Table.Row>
          <Img src={cabin.image}></Img>
          <Cabin>{cabin.name}</Cabin>
          <Cabin>Fits upto {cabin.maxCapacity} guests</Cabin>
          <Price>{formatCurrency(cabin.regularPrice)}</Price>
          {cabin.discount ? <Discount>{formatCurrency(cabin.discount)}</Discount> : <span>&mdash;</span>}
          
          
          <button disabled={isCreating} onClick={()=> handleDuplicate()} className="bg-slate-300 rounded-md p-2 w-10 h-10 flex items-center justify-center hover:bg-slate-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-slate-800"><HiSquare2Stack/></button>
          {/* onClick={()=> setShowForm((show) => !show)} */}
          <Modal>
          <Modal.Open opens="edit">

          <button className="bg-slate-300 rounded-md p-2 w-10 h-10 flex items-center justify-center hover:bg-slate-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-slate-800"><HiPencil/></button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateCabinForm CabintoEdit={cabin}></CreateCabinForm>
          </Modal.Window>
          <Modal.Open opens="delete">
            <button className=" bg-slate-300 rounded-md p-2 w-10 h-10 flex items-center justify-center hover:bg-slate-400 transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-slate-800"><HiTrash></HiTrash></button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="cabins" disabled={isloading} onConfirm={()=>deleteCabin(cabin.id)}></ConfirmDelete>
          </Modal.Window>

          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id}></Menus.Toggle>
            <Menus.List id={cabin.id}>
            <Menus.Button onClick={()=> handleDuplicate()} icon={<HiSquare2Stack/>}>Duplicate</Menus.Button>
            <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash></HiTrash>}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </Table.Row>
        
    )
};

export default CabinRow;


{/* <td>cab.name</td>
//       <td>cab.description</td>
//       <td>cab.image</td>
//       <td>cab.strength</td>
//       <td>cab.regularPrice</td>
//       <td>cab.discount</td> */}