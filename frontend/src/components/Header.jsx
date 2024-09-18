import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-col-reverse justify-center items-center xl:flex-row xl:justify-around ">
        <div className="flex">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((product) => (
              <div key={product._id} className="flex justify-center">
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;