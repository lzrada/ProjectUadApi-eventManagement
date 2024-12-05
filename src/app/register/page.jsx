import Image from "next/image";
const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/images/bg-login.jpg" alt="bg-login" className="bg-image" fill={true} />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <button className="text-purple-600 border-b-2 border-purple-600 pb-2 mr-4">SIGN UP</button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">USERNAME</label>
            <div className="relative">
              <input type="text" placeholder="Sugeng Supriadi" className="w-full p-3 border rounded-full gradient-border focus:outline-none" />
              <i className="fas fa-user absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">PHONE</label>
            <div className="relative">
              <input type="text" placeholder="+6223123132" className="w-full p-3 border rounded-full gradient-border focus:outline-none" />
              <i className="fas fa-phone absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">EMAIL ADDRESS</label>
            <div className="relative">
              <input type="email" placeholder="sugeng@gmail.com" className="w-full p-3 border rounded-full gradient-border focus:outline-none" />
              <i className="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">PASSWORD</label>
            <div className="relative">
              <input type="password" placeholder="••••••••" className="w-full p-3 border rounded-full gradient-border focus:outline-none" />
              <i className="fas fa-eye absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <button className="w-full py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none">
            <i className="fas fa-check mr-2"></i>CREATE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
