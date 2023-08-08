import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "@/actions/product";
import { IProduct } from "@/interfaces/product";

const Category = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.product);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Hàm chia mảng sản phẩm thành các trang (mỗi trang 4 sản phẩm)
  const chunkArray = (array: any, chunkSize: any) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  const productsPerPage = 4;
  const paginatedProducts = chunkArray(products, productsPerPage);

  const currentPage = new URLSearchParams(window.location.search).get("page");
  const currentPageIndex = currentPage ? parseInt(currentPage, 10) - 1 : 0;
  const totalPages = paginatedProducts.length;

  const uniqueCategories = [...new Set(products.map((product: any) => product.category))];

  const filteredProducts = selectedCategory
    ? products.filter((product: any) => product.category === selectedCategory)
    : products;
  const paginatedFilteredProducts = chunkArray(filteredProducts, productsPerPage);
  const currentFilteredProducts =
    paginatedFilteredProducts[currentPageIndex] || [];

  return (
    <div>
      <div id="view" className="h-full w-screen flex flex-row" x-data="{ sidenav: true }">
        <button className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden">
          <svg
            className="w-5 h-5 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011 1h12a1 1 0 110-2H4a1 1 0 01-1 1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="sidebar"
          className="bg-white h-screen md:block shadow-xl px-3 pt-1 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          x-show="sidenav"
        >
          <div id="menu" className="flex flex-col space-y-2">
            <Link
              to="/admin"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span className="">Sản phẩm chung</span>
            </Link>
            <a
              href=""
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                ></path>
              </svg>
              <span className="">Loại</span>
            </a>
            <a
              href=""
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="">Máy tính bảng</span>
            </a>
          </div>
        </div>

        <div className="antialiased font-sans bg-gray-200 h-full w-screen flex flex-row">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-[#5F5E61] leading-tight">
                  Loại
                </h2>
                
                <Link
                  className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                  to={`/admin/dashboard/product/add`}
                >
                  <span
                    className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                  >
                    Thêm loại
                  </span>
                  <span
                    className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
                  >
                    <svg
                      className="h-5 w-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
                
              </div>
              <span className="text-[#5A6169] text-[16px] py-4">
                Danh mục loại sản phẩm
              </span>
              <br />
              <div className="relative inline-flex mt-4 mb-2">
                  <select
                    className="appearance-none bg-white border border-gray-400 px-4 py-2 pr-8 rounded-md shadow leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Tất cả loại</option>
                    {uniqueCategories.map((category: any) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              <div className="my-2 flex sm:flex-row flex-col"></div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tên sản phẩm
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Giá gốc
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Thành tiền
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Giảm
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-red-600 uppercase tracking-wider">
                          Loại
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Miêu tả
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Hình
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFilteredProducts.map(
                        (product: IProduct, index: number) => {
                          const productIndex =
                            currentPageIndex * productsPerPage + index + 1; // Tính số thứ tự của sản phẩm trên toàn bộ danh sách
                          const maxProductNameLength = 20; // Số ký tự tối đa cho tên sản phẩm
                          const maxProductDescriptionLength = 50; // Số ký tự tối đa cho mô tả sản phẩm

                          // Hàm để cắt và hiển thị dấu "..." nếu tên sản phẩm quá dài
                          const truncateProductName = (name: string) => {
                            if (name.length > maxProductNameLength) {
                              return (
                                name.substring(0, maxProductNameLength) + "..."
                              );
                            }
                            return name;
                          };
                          const truncateProductDescription = (
                            description: string
                          ) => {
                            if (description.length > maxProductDescriptionLength) {
                              return (
                                description.substring(
                                  0,
                                  maxProductDescriptionLength
                                ) + "..."
                              );
                            }
                            return description;
                          };
                          return (
                            <tr key={product.id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {productIndex}
                              </td>{" "}
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <Link to={`product/update/${product.id}`}>
                                  {truncateProductName(product.name)}{" "}
                                  {/* Sử dụng hàm cắt tên sản phẩm */}
                                </Link>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {product.price}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {product.originalPrice}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {product.discount}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {product.category}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {truncateProductDescription(
                                  product.description
                                )}{" "}
                                {/* Sử dụng hàm cắt mô tả sản phẩm */}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <img
                                  className="h-[80px] w-[80px] rounded-full object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <Link  to={`/admin/dashboard/product/update/${product.id}`}>
                              <button className="bg-blue-600 mr-1 text-white rounded-md p-3">
                                Sửa
                              </button>
                              </Link>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                      Hiển thị {currentPageIndex * productsPerPage + 1} đến{" "}
                      {Math.min(
                        (currentPageIndex + 1) * productsPerPage,
                        products.length
                      )}{" "}
                      trong số {products.length} mục nhập
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                        onClick={() => {
                          const prevPageIndex = Math.max(currentPageIndex - 1, 0);
                          // Thay đổi query string của URL để chuyển đến trang trước đó
                          window.location.search = `?page=${
                            prevPageIndex + 1
                          }`;
                        }}
                      >
                        &lt; Trang trước
                      </button>
                      {/* Hiển thị số trang và cho phép chọn trang hiện tại */}
                      <div className="px-4 py-2 text-sm bg-gray-300 text-gray-800 font-semibold">
                        Trang {currentPageIndex + 1} / {totalPages}
                      </div>
                      <button
                        className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                        onClick={() => {
                          const nextPageIndex = Math.min(
                            currentPageIndex + 1,
                            paginatedProducts.length - 1
                          );
                          // Thay đổi query string của URL để chuyển đến trang tiếp theo
                          window.location.search = `?page=${
                            nextPageIndex + 1
                          }`;
                        }}
                      >
                        Trang tiếp theo &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
