import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0 image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0 no-image"
          style={{ height: size, width: size }}
        />
      )}
      <label
        className="px-4 mt-2 py-1 text-sm text-purple-600 bg-gray-50 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        htmlFor="single"
      >
        {uploading ? "Uploading ..." : "Upload"}
      </label>
      <div style={{ width: size }}>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
