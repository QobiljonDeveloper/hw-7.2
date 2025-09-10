import { memo, useEffect, useState } from "react";
import type { IProduct, IProductResponse } from "../../types";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState<null | IProductResponse>(null);
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#5DA4E3" />
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="text-red-500 text-center">
        Xatolik yuz berdi: {error.message}
      </h2>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-[#5DA4E3]">Products</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.products?.map((item: IProduct) => (
          <Link to={`/products/${item.id}`} key={item.id}>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.brand} - {item.category}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    ${item.price}
                  </span>
                  <span className="text-sm text-yellow-500 font-medium">
                    Rating: {item.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
