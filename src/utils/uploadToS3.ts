import axios from "axios";
import { BASE_S3_URL } from "constants/api-requests";
import { PresignedUrlResponseItem } from "typings/api";

export async function uploadToS3(
  data: PresignedUrlResponseItem,
  fileType: string,
  fileContents: File
) {
  const formData = new FormData();
  formData.append("Content-Type", fileType);
  Object.entries(data.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append("file", fileContents); // The file has be the last element

  const response = await axios.post(data.url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log("response", response);

  return `${BASE_S3_URL}/${data.fields.key}`;
}
