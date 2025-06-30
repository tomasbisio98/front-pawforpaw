import axios from "axios";

export const uploadUserImage = async (userId: string, file: File, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}file/uploadUserImage/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.imageUrl;
};
