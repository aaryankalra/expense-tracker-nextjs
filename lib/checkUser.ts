import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const checkUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};

export default checkUser;
