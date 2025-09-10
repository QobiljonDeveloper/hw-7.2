import { memo, useEffect, useState } from "react";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import type { IRecipe, IRecipeResponse } from "../../types";

const Food = () => {
  const [data, setData] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<IRecipeResponse>("https://dummyjson.com/recipes")
      .then((res) => setData(res.data.recipes))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#5DA4E3" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-[#5DA4E3]">Recipes</h2>

      <div className="grid gap-6 grid-cols-4">
        {data.map((item: IRecipe) => (
          <Link
            key={item.id}
            to={`/foods/${item.id}`}
            className="bg-white shadow-md rounded-2xl overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.cuisine}</p>
              <p className="text-sm text-gray-500">
                {item.cookTimeMinutes} min
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">
                  Difficulty: {item.difficulty}
                </span>
                <span className="text-yellow-500 font-medium">
                  Rating: {item.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Food);
