import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 5
};

export const VoidModal = () => {
    return(
        <div className='flex justify-center items-center text-base text-white w-full h-full' >
            Sin datos que mostrar
        </div>
    );
}

function ModalGeneric({ open = false, handleClose, children = VoidModal() }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}

export default ModalGeneric;