import Header from "@/components/header/page";
import axios from "axios";

const Home = async (children) => {
  const { data } = await axios.get("https://api.escuelajs.co/api/v1/products");

  return (
    <div>
      <Header/>
      <div className="grid grid-cols-5 gap-y-4 gap-x-4 items-center justify-around h-auto w-auto bg-gray-200  ml-50 mt-20 ">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="items-center bg-green-200 border-2 rounded shadow-2xl"
            >
              <h2>{item.title}</h2>

              <img
                className="rounded shadow-xl m-7"
                src={item.images}
                alt={item.title}
                width={200}
                height={200}
              />

              <span className="fle">
                Price:$
                {item.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
