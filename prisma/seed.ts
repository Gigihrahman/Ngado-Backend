import { PrismaService } from "../src/modules/prisma/prisma.service";
const prisma = new PrismaService();
async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        email: "wawans@mail.com",
        password:
          "$argon2i$v=19$m=16,t=2,p=1$d2F3YW5hamFkdWx1$WMwfBbmwx/GyRN9WWU+oFQ",
        name: "Admin User",
        role: "ADMIN",
      },
      {
        email: "ilham@mail.com",
        password:
          "$argon2i$v=19$m=16,t=2,p=1$d2F3YW5hamFkdWx1$WMwfBbmwx/GyRN9WWU+oFQ",
        //plain password: "password",
        name: "Regular User",
        role: "USER",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
