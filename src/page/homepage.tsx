import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getProducts } from '@/actions/product';
import Slider from '@/components/layout/slider';
import { useAppDispatch, useAppSelector } from '@/store/hook';

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state: any) => state.product);

  const [currentPage, setCurrentPage] = useState(0); // Đổi giá trị ban đầu của currentPage thành 0
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage); // Cập nhật currentPage với trang mới
  };

  const renderProducts = () => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return currentProducts.map((product: any) => (
      <Link to={`/products/${product.id}`} key={product.id} className="m-2">
        <div
          className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
          style={{ margin: '10px' }}
        >
          <img
            className="h-48 w-full object-cover object-center"
            src={product.image}
            alt="Product Image"
          />
          <div className="p-4">
            <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
              {product.name}
            </h2>
            <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
              {truncateDescription(product.description, 70)}
            </p>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </p>
              {product.discount && (
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                  ${product.originalPrice}
                </p>
              )}
              {product.discount && (
                <p className="ml-auto text-base font-medium text-green-500">
                  {product.discount}% off
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  const pageCount = Math.ceil(products.length / productsPerPage);

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className="bg-indigo-50">
      <Slider />
      <section className="body-font text-gray-600">
        <div className="container mx-auto px-5 py-10 flex flex-wrap justify-center">
          {renderProducts()}
        </div>
      </section>
      {/* Phân trang */}
      <div className="flex justify-center items-center pb-6">
        <ReactPaginate
          previousLabel={<i className="fas fa-angle-left">Trước</i>}
          nextLabel={<i className="fas fa-angle-right">Tiếp</i>}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => handlePageChange(selected)}
          containerClassName={'pagination flex items-center'}
          pageClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          previousClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          nextClassName={
            'mx-1 px-3 py-2 rounded-md bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white'
          }
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default HomePage;
