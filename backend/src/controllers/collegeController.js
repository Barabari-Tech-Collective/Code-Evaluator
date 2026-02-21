export const getColleges = async (req, res) => {
  const colleges = await prisma.college.findMany({
    select: { id: true, name: true },
  });
  res.json(colleges);
};