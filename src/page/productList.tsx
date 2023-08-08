// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { deleteProduct, getProducts } from "@/actions/product";
// import { IProduct } from "@/interfaces/product";

// const ProductsList = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state: any) => state.product);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   // Hàm chia mảng sản phẩm thành các trang (mỗi trang 4 sản phẩm)
//   const chunkArray = (array: any, chunkSize: any) => {
//     const chunks = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       chunks.push(array.slice(i, i + chunkSize));
//     }
//     return chunks;
//   };

//   // Chia danh sách sản phẩm thành các trang (mỗi trang 4 sản phẩm)
//   const productsPerPage = 4;
//   const paginatedProducts = chunkArray(products, productsPerPage);

//   // Lấy trang hiện tại từ query string (nếu không có, mặc định là trang đầu tiên)
//   const currentPage = new URLSearchParams(window.location.search).get("page");
//   const currentPageIndex = currentPage ? parseInt(currentPage, 10) - 1 : 0;
//   const currentProducts = paginatedProducts[currentPageIndex] || [];
//   const totalPages = paginatedProducts.length;
//   const handleDeleteProduct = async (id: any) => {
//     // Hiển thị hộp thoại xác nhận
//     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?");
//     if (confirmDelete) {
//       try {
//         // Gọi action deleteProduct và truyền vào productId để xóa sản phẩm
//         await dispatch(deleteProduct(id));
//         // Nếu không có lỗi xảy ra, Redux store đã được cập nhật và sản phẩm đã được xóa thành công
//         // Cập nhật lại state trong component (nếu cần thiết) không bắt buộc vì Redux store đã được cập nhật
//       } catch (error) {
//         // Xử lý lỗi nếu có
//         console.log("Lỗi khi xóa sản phẩm:", error);
//       }
//     }
//   };
//   return (
//     <div>
//         <div className="antialiased font-sans bg-gray-200 h-full w-screen flex flex-row">
//           <div className="container mx-auto px-4 sm:px-8">
//             <div className="py-8">
//               <div className="flex justify-between">
//                 <h2 className="text-2xl font-semibold text-[#5F5E61] leading-tight">
//                   Điện thoại
//                 </h2>
//      <Link
//   className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
//   to={`product/add`}
// >
//   <span
//     className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
//   >
//     Thêm sản phẩm
//   </span>

//   <span
//     className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
//   >
//     <svg
//       className="h-5 w-5 rtl:rotate-180"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="2"
//         d="M17 8l4 4m0 0l-4 4m4-4H3"
//       />
//     </svg>
//   </span>
//   </Link>
//               </div>
//               <span className="text-[#5A6169] text-[16px] py-4">
//                 Danh mục sản phẩm
//               </span>
//               <div className="my-2 flex sm:flex-row flex-col"></div>
//               <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//                 <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//                   <table className="min-w-full leading-normal">
//                     <thead>
//                       <tr>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           #
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Tên sản phẩm
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Giá gốc
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Thành tiền
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Giảm
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Loại
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           miêu tả
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Image
//                         </th>
//                         <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                           Thao tác
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {currentProducts.map((product: IProduct, index: any) => {
//                         // Thay đổi từ products sang currentProducts
//                         const productIndex =
//                           currentPageIndex * productsPerPage + index + 1; // Tính số thứ tự của sản phẩm trên toàn bộ danh sách
//                         const maxProductNameLength = 20; // Số ký tự tối đa cho tên sản phẩm
//                         const maxProductDescriptionLength = 50; // Số ký tự tối đa cho mô tả sản phẩm

//                         // Hàm để cắt và hiển thị dấu "..." nếu tên sản phẩm quá dài
//                         const truncateProductName = (name: string) => {
//                           if (name.length > maxProductNameLength) {
//                             return (
//                               name.substring(0, maxProductNameLength) + "..."
//                             );
//                           }
//                           return name;
//                         };

//                         // Hàm để cắt và hiển thị dấu "..." nếu mô tả sản phẩm quá dài
//                         const truncateProductDescription = (
//                           description: string
//                         ) => {
//                           if (
//                             description.length > maxProductDescriptionLength
//                           ) {
//                             return (
//                               description.substring(
//                                 0,
//                                 maxProductDescriptionLength
//                               ) + "..."
//                             );
//                           }
//                           return description;
//                         };

//                         return (
//                           <tr key={product.id}>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {productIndex}
//                             </td>{" "}
//                             {/* Hiển thị số thứ tự */}
//                             <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                               <Link to={`product/update/${product.id}`}>
//                                 {truncateProductName(product.name)}{" "}
//                                 {/* Sử dụng hàm cắt tên sản phẩm */}
//                               </Link>
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {product.price}
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {product.originalPrice}
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {product.discount}
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {product.category}
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               {truncateProductDescription(product.description)}{" "}
//                               {/* Sử dụng hàm cắt mô tả sản phẩm */}
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                               <img
//                                 className="w-[100px]  rounded-lg"
//                                 src={product.image}
//                                 alt=""
//                               />
//                             </td>
//                             <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            
//                             <Link  to={`product/update/${product.id}`}>
//                               <button className="bg-blue-600 mr-1 text-white rounded-md p-2">
//                                 Sửa
//                               </button>
//                               </Link>
//                               <button onClick={()=> handleDeleteProduct(product.id)} className="bg-red-600 ml-1 text-white rounded-md p-2">
//                                 Xoá
//                               </button>
                              
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                   <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
//                     <span className="text-xs xs:text-sm text-gray-900">
//                       Hiển thị {currentPageIndex * productsPerPage + 1} đến{" "}
//                       {Math.min(
//                         (currentPageIndex + 1) * productsPerPage,
//                         products.length
//                       )}{" "}
//                       trong số {products.length} mục nhập
//                     </span>
//                     <div className="inline-flex mt-2 xs:mt-0">
//                       <button
//                         className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
//                         onClick={() => {
//                           const prevPageIndex = Math.max(
//                             currentPageIndex - 1,
//                             0
//                           );
//                           // Thay đổi query string của URL để chuyển đến trang trước đó
//                           window.location.search = `?page=${prevPageIndex + 1}`;
//                         }}
//                       >
//                         &lt; Trang trước
//                       </button>
//                       {/* Hiển thị số trang và cho phép chọn trang hiện tại */}
//                       <div className="px-4 py-2 text-sm bg-gray-300 text-gray-800 font-semibold">
//                         Trang {currentPageIndex + 1} / {totalPages}
//                       </div>
//                       <button
//                         className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
//                         onClick={() => {
//                           const nextPageIndex = Math.min(
//                             currentPageIndex + 1,
//                             paginatedProducts.length - 1
//                           );
//                           // Thay đổi query string của URL để chuyển đến trang tiếp theo
//                           window.location.search = `?page=${nextPageIndex + 1}`;
//                         }}
//                       >
//                         Trang tiếp theo &gt;
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default ProductsList;
