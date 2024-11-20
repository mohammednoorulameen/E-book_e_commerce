import Modal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
Modal.setAppElement("#root");



const OrderCancelModal = ({ isOpen, onClose, onSubmit }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal-content fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
        overlayClassName="modal-overlay fixed z-50 inset-0"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-6"
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to cancel this product?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Once cancelled, you won’t be able to recover this order.
          </Typography>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button color="error" onClick={onSubmit}>
              Yes, Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export { OrderCancelModal };
  







// import React from "react";
// import Modal from "react-modal";
// import CloseIcon from "@mui/icons-material/Close";
// import { Button, Box, Typography } from "@mui/material";
// import * as Yup from "yup";
// import { useFormik } from "formik";
// Modal.setAppElement("#root");


// const OrderCancelModal = ({ isOpen, onClose, addressId, onSubmit }) => {
//     /**
//      * handle delete submission
//      */
//     const HandleDelete = () => {
//       onSubmit(addressId);
//       onClose();
//     };
  
//     /**
//      * handle close modal
//      */
  
//     const HandleClose = () => {
//       onClose();
//     };
  
//     return (
//       <div>
//         {/* Confirmation modal */}
//         <Modal
//           isOpen={isOpen}
//           onRequestClose={onClose}
//           className="modal-content fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
//           overlayClassName="modal-overlay fixed z-50 inset-0"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 400,
//               // bgcolor: 'background.paper',
//               boxShadow: 24,
//               p: 4,
//               borderRadius: 2,
//             }}
//             className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto p-6"
//           >
//             <Typography id="modal-title" variant="h6" component="h2">
//               Are you sure you want to cancel this product?
//             </Typography>
//             <Typography id="modal-description" sx={{ mt: 2 }}>
//               Once cancel, you won’t be able to recover this order.
//             </Typography>
//             <Box
//               sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
//             >
//               <Button onClick={HandleClose} color="primary">
//                 Cancel
//               </Button>
//               <Button color="error" onClick={HandleDelete}>
//                 Yes, Delete
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </div>
//     );
//   };
  

//   export { OrderCancelModal } 