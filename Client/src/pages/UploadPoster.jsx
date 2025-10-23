import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '@/lib/supabaseClient';

export default function UploadPoster() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState(null);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

   
    if (selected.type !== "image/jpeg") {
      setMessage("Only JPG files are allowed.");
      setFile(null);
      setPreview(null);
      setUploadedUrl(null);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
    setUploadedUrl(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a JPG file to upload.");
      return;
    }

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("posters")
        .upload(`public/${fileName}`, file);

      if (error) throw error;

  
      const { data: publicData, error: urlError } = supabase
        .storage
        .from("posters")
        .getPublicUrl(`public/${fileName}`);

      if (urlError) throw urlError;

      setMessage("Uploaded successfully!");
      setUploadedUrl(publicData.publicUrl);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setMessage(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Upload Poster</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/jpeg"
          onChange={handleFileChange}
          className="text-black"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded border border-gray-700 mt-2"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Upload Poster
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      {uploadedUrl && (
        <div className="mt-4 text-center">
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-200"
          >
            View Uploaded Poster
          </a>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          to="/uploads"
          className="text-blue-400 underline hover:text-blue-200"
        >
          View All Uploads
        </Link>
      </div>
    </div>
  );
}
