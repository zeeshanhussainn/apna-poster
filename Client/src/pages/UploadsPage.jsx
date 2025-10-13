// src/pages/UploadsPage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function UploadsPage() {
  const [uploads, setUploads] = useState({});

  useEffect(() => {
    const fetchUploads = async () => {
      // List all folders in posters bucket (root level)
      const { data: folders, error: folderError } = await supabase.storage
        .from("posters")
        .list("", { limit: 100 });

      if (folderError) {
        console.error("Error fetching folders:", folderError);
        return;
      }

      let allUploads = {};

      for (const folder of folders) {
        if (folder.name) {
          // List files inside each folder
          const { data: files, error } = await supabase.storage
            .from("posters")
            .list(folder.name, { limit: 100 });

          if (error) {
            console.error(`Error fetching ${folder.name}:`, error);
          } else {
            const urls = files.map((file) =>
              supabase.storage
                .from("posters")
                .getPublicUrl(`${folder.name}/${file.name}`).data.publicUrl
            );
            allUploads[folder.name] = urls;
          }
        }
      }

      setUploads(allUploads);
    };

    fetchUploads();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black via-[#0a0a2a] to-black text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📂 My Uploaded Posters
      </h2>

      {Object.keys(uploads).length === 0 ? (
        <p className="text-center text-gray-400">No uploads yet.</p>
      ) : (
        Object.keys(uploads).map((folderName) => (
          <div key={folderName} className="mb-10">
            <h3 className="text-xl font-semibold mb-4 capitalize border-b border-gray-600 pb-2">
              {folderName} Posters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {uploads[folderName].map((url, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform bg-black/40 backdrop-blur-md border border-gray-700"
                >
                  <img src={url} alt={`${folderName} ${idx}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
