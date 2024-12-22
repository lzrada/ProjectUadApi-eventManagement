import { ClipboardPlus } from "lucide-react";

const pageAdmin = () => {
  return (
    <>
      <div className="p-2 w-64 bg-gray-500 h-screen">
        <h1 className="mx-5 my-2 text-xl font-bold text-white">Admin Panel</h1>
        <ul>
          <li className="my-5 mx-2 items-center text-white text-md font-bold flex hover:bg-gray-400 p-2 rounded-lg cursor-pointer">
            <ClipboardPlus size={20} className="mr-2 " /> Crud
          </li>
        </ul>
      </div>
    </>
  );
};
export default pageAdmin;
