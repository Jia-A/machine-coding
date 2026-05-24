"use client";
import Image from "next/image";
import { useState } from "react";

type FileItem = {
  file: File; // native browser File type
  previewURL: string;
  error: string | undefined;
};

const FileUpload = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const handleDrop = (e) => {
    setIsDragOver(false);
    setError("");
    e.preventDefault();
    const filesArray = Array.from(e.dataTransfer.files) as File[];
    if (files?.length + filesArray.length > 5) {
      setError("Can't upload more than 5 files");
      return;
    }
    const processedFiles = filesArray.map((file) => ({
      file: file,
      previewURL: URL.createObjectURL(file),
      error: validateFile(file),
    }));

    setFiles((prev) => [...prev, ...processedFiles]);

    console.log(processedFiles);
  };

  console.log(files);

  function validateFile(file) {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type))
      return "Only jpg, png, and webp files are allowed";
    if (file.size > 5 * 1024 * 1024) return "File size must be under 5MB";
    return undefined;
  }

  const arrayedFiles = files.filter((item) => item.error === undefined);
  console.log(arrayedFiles);

  const handleUpload = (file: FileItem) => {
    // Start at 0
    setProgress((prev) => ({ ...prev, [file.file.name]: 0 }));

    const interval = setInterval(() => {
      setProgress((prev) => {
        const current = prev[file.file.name];
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [file.file.name]: current + 10 };
      });
    }, 200);
  };
  const handleRemove = (file: FileItem) => {
    const remainingFiles = files.filter(
      (item) => item.previewURL !== file.previewURL,
    );
    URL.revokeObjectURL(file.previewURL);

    setFiles(remainingFiles);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {error && <div className="text-red-500 text-2xl text-bold">{error}</div>}
      <div
        className={`h-[400px] m-5 flex flex-col justify-center items-center border border-dashed  ${isDragOver ? "border-mauve-700 shadow" : "border-mauve-400"}`}
        onDrop={(e) => handleDrop(e)}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
      >
        <p>Drag and Drop here or </p>
        <button style={{ pointerEvents: "none" }}>
          <input type="file" />
        </button>
      </div>
      <div className=" flex flex-wrap gap-3 h-1/2 m-4 p-5 rounded border border-mauve-400">
        {files?.map((file) => {
          return (
            <div key={file.file.name} className="flex flex-col gap-2 w-40">
              <div
                className={`w-40 h-40 flex justify-center items-center relative rounded ${file.error && "border border-dashed border-red-500 "}`}
              >
                {file.error && (
                  <div className="text-red-600 flex justify-center items-center">
                    {file.error}
                  </div>
                )}
                {!file.error && (
                  <Image
                    fill
                    src={file.previewURL}
                    className="absolute"
                    alt={file.file.name}
                  />
                )}
                {!file.error && (
                  <button
                    className="rounded-full bg-red-600 text-white absolute top-[-5px] right-[-5px] px-1 text-[12px]"
                    onClick={() => {
                      handleRemove(file);
                    }}
                  >
                    x
                  </button>
                )}
              </div>
              <span>Name : {file.file.name}</span>
              <span>Size : {(file.file.size / 1024 / 1024).toFixed(2)}mb</span>
              {!file.error && (
                <button
                  className="bg-mauve-300 rounded"
                  onClick={() => handleUpload(file)}
                >
                  Upload
                </button>
              )}
              {!file.error && progress[file.file.name] !== undefined && (
                <div className="w-full bg-gray-200 rounded h-2">
                  <div
                    className="bg-blue-500 h-2 rounded transition-all duration-200"
                    style={{ width: `${progress[file.file.name]}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;
