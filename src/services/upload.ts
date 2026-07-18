import api from "@/lib/api";



const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;


export async function uploadDelegatePhoto(file: File) {
  const formData = new FormData();

  formData.append("photo", file);

  const response = await api.post(
    "/delegates/upload-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}



export async function uploadExpenseReceipt(
  file: File
): Promise<string> {

  const formData =
    new FormData();

  formData.append(
    "receipt",
    file
  );

  const response =
    await api.post(
      "/upload/upload-receipt",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data.url;
}