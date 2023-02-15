import React, {useState } from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { style } from '../../App';


const ModalComponent = ({children,open,close}) => {

  return (
   
 <Paper>
     {/* Profile Modal */}
 <Box>
   <div className="app__modal">
     <Modal
       open={open}
       onClose={close}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box sx={style}>
         <div className="modal__body">
          {children}
         </div>
       </Box>
     </Modal>
   </div>
 </Box>
</Paper>
  )
}

export default ModalComponent