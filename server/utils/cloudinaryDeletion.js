import { v2 as cloudinary } from "cloudinary";

// Helper to delete a Cloudinary asset by public_id and resource type
export const deleteCloudinaryFile = async (
  publicId,
  resourceType = "image"
) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
};
