import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import axios from "axios";

const Home = async () => {
  const { data } = await axios.get(
    "https://api.escuelajs.co/api/v1/products"
  );

  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Body */}
      <div className="flex bg-gray-200 h-screen pt-5 ">
        {/* Sidebar */}
        <SideBarAll />

        {/* Main Content */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center"
              >
                <h2 className="font-semibold text-center mb-2">
                  {item.title}
                </h2>

                <img
                  className="rounded-lg shadow-md mb-3"
                  src={item.images[0]}
                  alt={item.title}
                  width={200}
                  height={200}
                />

                <span className="font-bold text-green-600">
                  Price: ${item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
