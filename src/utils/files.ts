import { env } from "@/env";

export const getImageUrl = (fileKey: string) => {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}
  `;
};
