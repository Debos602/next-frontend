import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {

  const session = await getServerSession(authOptions);
  console.log(session);


  return (
    <div className="min-h-dvh flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {session?.user?.name}</h1>
      <p className="text-lg text-gray-600 italic text-center">
        {session?.user?.email}
      </p>
    </div>
  );
};

export default DashboardHomePage;
