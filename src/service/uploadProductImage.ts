import axios from "axios";

export const uploadTempProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/file/uploadProductImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};
