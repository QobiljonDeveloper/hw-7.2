import { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const ProductsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#5DA4E3" />
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center text-red-500">Mahsulot topilmadi</h2>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-2">
            ${product.price}
          </p>
          <p className="text-yellow-500 mb-2">Rating: {product.rating}</p>
          <p className="text-gray-500">Brand: {product.brand}</p>
          <p className="text-gray-500">Category: {product.category}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-500  text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Ortga
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsDetail);
