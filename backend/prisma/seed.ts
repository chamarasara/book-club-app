import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const a1 = await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'George Orwell', bio: 'British novelist and essayist.' }
  });

  const a2 = await prisma.author.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Toni Morrison', bio: 'American novelist, Nobel laureate.' }
  });

  await prisma.book.createMany({
    data: [
      { title: '1984', description: 'Dystopian novel', publishedYear: 1949, authorId: a1.id },
      { title: 'Beloved', description: 'Historical fiction', publishedYear: 1987, authorId: a2.id }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
