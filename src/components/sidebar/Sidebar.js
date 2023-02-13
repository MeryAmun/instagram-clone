import React, {useState, useEffect} from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { sidebarData } from '../../assets/icons/icons'
import { CreatePost, Header } from '../index'
import { PlusSquare } from 'react-feather';
import './sidebar.css'
import { style } from '../../App';

const Sidebar = () => {
  const [open, setOpen] = useState(false);




  return (
    <div className='sidebar'>
       <div className="suggestions__profileModal">
 {/* Profile Modal */}
 <Paper>
        <Box>
          <div className="app__modal">
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="modal__body">
                  <CreatePost/>
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Paper>
        </div>
     <div className="sidebar__header">
        <Header/>
        </div>
        <div className="sidebar__icons">
          {
            sidebarData.map((link,index) => (
              <div className="sidebar__iconBox" key={index}>
                <span className="sidebar__icon">{link.icon}</span>
                <span>{link.title}</span>
              </div>
            ))
          }
          <div className="sidebar__iconBox" onClick={() => setOpen(true)}>
                <span className="sidebar__icon"><PlusSquare/></span>
                <span>Create</span>
              </div>
        </div>
        </div>
  )
}

export default Sidebar