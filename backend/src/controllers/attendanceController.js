import axios from "axios";

export const getAttendance = async (req, res) => {
  try {
    const { collegeId } = req.query;

    if (!collegeId) {
      return res.status(400).json({ error: "collegeId required" });
    }

    const response = await axios.get(
      `${process.env.ATTENDANCE_SERVICE_URL}/api/attendance`,
      {
        params: { collegeId }
      }
    );
    console.log("this data disha is getting", response.data)

    return res.json(response.data);

  }catch (error) {
  console.error("FULL ERROR:", error.response?.status, error.response?.data);
  return res.status(error.response?.status || 500).json({
    error: error.response?.data || "Failed to fetch attendance"
  });
  // catch (error) {
  //   console.error("DISHA ATTENDANCE ERROR:", error.message);
  //   return res.status(500).json({ error: "Failed to fetch attendance" });
  // }
};