// import React from "react";
// import { Form } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ShowLoading,
//   HideLoading,
//   SetPortfolioData,
// } from "../../redux/rootSlice";
// import axios from "axios";
// import { message } from "antd";

// function AdminContact() {
//   const dispatch = useDispatch();

//   const { portfolioData } = useSelector((state) => state.root);

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axios.post(
//         "http://localhost:5000/api/portfolio/update-contact",
//         {
//           ...values,
//           _id: portfolioData.contact._id,
//         }
//       );
//       dispatch(HideLoading());
//       if (response.data.success) {
//         dispatch(
//           SetPortfolioData({ ...portfolioData, contact: response.data.data })
//         );
//         message.success(response.data.message);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };
//   return (
//     <div>
//       <Form
//         onFinish={onFinish}
//         layout="vertical"
//         initialValues={portfolioData.contact}
//       >
//         <Form.Item name="name" label="Name">
//           <input placeholder="Name" required />
//         </Form.Item>
//         <Form.Item name="email" label="Email">
//           <input placeholder="Email" required />
//         </Form.Item>
//         <Form.Item name="mobile" label="Mobile">
//           <input placeholder="Mobile" required />
//         </Form.Item>
//         <Form.Item name="address" label="Address">
//           <input placeholder="Address" required />
//         </Form.Item>
//         <Form.Item name="education" label="Education">
//           <input placeholder="Education" required />
//         </Form.Item>
//         <div className=" flex justify-end w-full">
//           <button
//             className="px-10 py-2 bg-primary text-secondary"
//             type="submit"
//           >
//             SAVE
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default AdminContact;
