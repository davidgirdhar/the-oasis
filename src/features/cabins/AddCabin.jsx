import { useState } from "react";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (        
        <>

        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm></CreateCabinForm>
            </Modal.Window>
        </Modal>

        <Modal>
            <Modal.Open opens="table">
                <Button>Cabin table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable></CabinTable>
            </Modal.Window>
        </Modal>
        </>
        
    )
}



// function AddCabin() {
//     const [isOpenModal, setOpenModal] = useState(false);
//     return(
//         <div>            
//             <Button onClick={()=>setOpenModal(!isOpenModal)}>Add Cabin</Button>
//             {isOpenModal && <Modal onClose={()=>setOpenModal(!isOpenModal)}><CreateCabinForm onCancel={()=>setOpenModal(!isOpenModal)}></CreateCabinForm></Modal>}
//         </div>
//     )
// }

export default AddCabin;