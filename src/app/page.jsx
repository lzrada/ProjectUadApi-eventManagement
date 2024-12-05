import React from "react";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="">
      <div className="bg-gradient-to-r from-cyan-500 from-30% to-blue-500 to-60%  shadow-black shadow-xl w-[67%] h-[100vh] absolute top-0 left-0 rounded-tr-[500px] rounded-br-[500px] "></div>
      <Image src={"/images/bg-login.jpg"} alt="bg-login" className="bg-image" fill={true} />
      <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 relative rounded z-10">
        cek
      </Link>
    </div>
  );
};

export default Home;
