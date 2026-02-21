import { auth } from "@clerk/nextjs/server";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import "../globals.css";
import { prisma } from "@/prisma";
import { UserProvider } from "@/providers/UserContextProvider";

export default async function BoardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;

}>) {

  const { userId } = await auth()

  let userData = null

  if (userId) {
    userData = await prisma.user.findUnique({
      where: { id: userId },
    })
  }
  return (
    <UserProvider user={userData}>
    <div className="max-w-screen-md lg:max-w-screen-lg mx-auto xl:max-w-screen-xl xxl:max-w-screen-xxl flex justify-between">
      <div className="px-2 xsm:px-4 xxl:px-8 ">
        <LeftBar/>
      </div>
      <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray ">
        {children}
        {modal}
      </div>
      <div className="hidden lg:flex ml-4 md:ml-8  flex-1">
        <RightBar />
      </div>
    </div>
    </UserProvider>
  );
}
