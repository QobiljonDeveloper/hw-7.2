import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import type { IRecipeDetails } from "../../types";

const FoodsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [data, setData] = useState<IRecipeDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<IRecipeDetails>(`https://dummyjson.com/recipes/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

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
        Xatolik yuz berdi: {error?.message || "Noma’lum xato"}
      </h2>
    );
  }

  if (!data) {
    return <h2 className="text-center text-gray-600">Recipe Topilmadi</h2>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.name}</h2>
          <p className="text-sm text-gray-600 mb-2">Cuisine: {data.cuisine}</p>
          <p className="text-sm text-gray-600 mb-2">
            Preparation {data.prepTimeMinutes}min | Cooking time {data.cookTimeMinutes}min
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Difficulty: {data.difficulty}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Rating: {data.rating} ({data.reviewCount} reviews)
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ingredients
            </h3>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              {data.ingredients.map((ing, idx) => (
                <p key={idx}> {ing}</p>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Instructions
            </h3>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {data.instructions.map((step, idx) => (
                <p key={idx}>{step}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FoodsDetails);
