import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getProductById, getProducts } from "@/actions/product";
import { add } from "@/slices/cart";
import { IProduct } from "@/interfaces/product";
import { addCommentToProduct, fetchCommentsByProductId } from "@/actions/comment";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  // const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  //// comment

  const id = Number(useParams<{ id: string }>().id);
  const comments = useSelector((state: any) => state.comment.commentsByProduct[id]);
  // const commentStatus = useSelector((state: any) => state.comment.status);
  const error = useSelector((state: any) => state.comment.error);

  const handleAddComment = (comment: string) => {
    if (comment.trim() !== "") {
      dispatch(addCommentToProduct({ id, comment }));
    }
  };

  //// comment

  const { selectedProduct, isLoading } = useAppSelector(
    (state: any) => state.product
  );
  const allProducts = useAppSelector((state: any) => state.product.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
      dispatch(getProducts()); // Gọi action để lấy danh sách sản phẩm
      dispatch(fetchCommentsByProductId(id));
    }
  }, [dispatch, id]);

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const productToAdd = { ...selectedProduct, quantity: selectedQuantity };
      dispatch(add(productToAdd));
      alert("Đã thêm sản phẩm vào giỏ hàng.");
    }
  };
  console.log(allProducts);
  useEffect(() => {
    if (selectedProduct && allProducts) {
      // Lọc danh sách các sản phẩm liên quan dựa vào category của sản phẩm hiện tại
      const relatedProducts = allProducts.filter(
        (product: any) => product.category === selectedProduct.category
      );

      // Loại bỏ sản phẩm hiện tại khỏi danh sách liên quan
      const filteredRelatedProducts = relatedProducts.filter(
        (product: any) => product.id !== selectedProduct.id
      );

      // Giới hạn số lượng sản phẩm liên quan hiển thị, chẳng hạn 4 sản phẩm
      const limitRelatedProducts = filteredRelatedProducts.slice(0, 4);

      setRelatedProducts(limitRelatedProducts);
    }
  }, [selectedProduct, allProducts]);

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  if (!selectedProduct) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  return (
    <div className="bg-indigo-50 py-2">
      <header>{/* Your header code here */}</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Your breadcrumbs code here */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div x-data="{ image: 1 }" x-cloak>
              <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                <div
                  x-show="image === index + 1"
                  className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                >
                  <img
                    src={selectedProduct.image}
                    alt={"Image" + selectedProduct.image}
                    className="object-contain h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-500 text-sm">
              Loại{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                {selectedProduct.category}
              </a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div>
                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                  <span className="text-indigo-400 mr-1 mt-1">$</span>
                  <span className="font-bold text-indigo-600 text-3xl">
                    {selectedProduct.price}
                  </span>
                </div>
              </div>
              {selectedProduct.discount && (
                <div className="flex-1">
                  <p className="text-green-500 text-xl font-semibold">
                    Giảm {selectedProduct.discount}%
                  </p>
                  <p className="text-gray-400 text-sm">
                    Bao gồm tất cả các loại thuế.
                  </p>
                </div>
              )}
            </div>

            <p className="text-gray-500">{selectedProduct.description}</p>

            <div className="flex py-4 space-x-4">
              <div className="relative">
                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                  Số lượng
                </div>
                <select
                  className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-7 pr-11 h-14 flex items-end pb-1"
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>

                <svg
                  className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>

              <button
                type="button"
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-100 mt-[50px] p-6 rounded-lg shadow-lg">
  <h2 className="text-3xl font-semibold mb-4">Bình luận</h2>

  {/* Hiển thị danh sách bình luận */}
  {Array.isArray(comments) && comments.length > 0 ? (
    comments.map((comment, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p className="text-lg text-gray-800">{comment.content}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">Không có bình luận.</p>
  )}

  {/* Form để thêm bình luận */}
  <form onSubmit={(e: any) => { e.preventDefault(); handleAddComment(e.target.comment.value) }} className="mt-4">
    <input
      type="text"
      name="comment"
      placeholder="Nhập bình luận..."
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
    />
    <button type="submit" className="mt-2 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition-colors ">
  Gửi
</button>

  </form>

  {/*... (các phần code khác) */}
</div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 transition duration-300 transform hover:scale-105">
                <img src={product.image} alt={'Related Image' + product.id} className="w-full h-40 object-cover mb-4 rounded-lg" />
                <h3 className="text-gray-800 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">Loại <Link to={`/category/${product.category}`} className="text-indigo-600 hover:underline">{product.category}</Link></p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-indigo-400 mt-1">$</span>
                    <span className="font-bold text-indigo-600 text-xl">{product.price}</span>
                  </div>
                  {product.discount && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      Giảm {product.discount}%
                    </div>
                  )}
                </div>
                <Link to={`/products/${product.id}`}>
                  <button className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 w-full">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
