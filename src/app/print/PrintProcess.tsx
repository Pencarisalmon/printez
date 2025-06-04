"use client";
import { useState, useEffect } from "react";

interface MidtransSnapResult {
  transaction_status?: string;
  order_id?: string;
  payment_type?: string;
  gross_amount?: string;
  status_code?: string;
  status_message?: string;
  fraud_status?: string;
  transaction_id?: string;
}
declare global {
  interface Window {
    snap: {
      embed: (
        token: string,
        options: {
          embedId: string;
          // Use the defined interface for the result parameter instead of any
          onSuccess?: (result: MidtransSnapResult) => void;
          onPending?: (result: MidtransSnapResult) => void;
          onError?: (result: MidtransSnapResult) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}
import PrintForm from "@/components/ui/printForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

const PrintProcess = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoRek, setShowNoRek] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0)
  const [hargaPrint, setHargaPrint] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [printType, setPrintType] = useState<string>("")

  useEffect(() => {
  let harga = 0;

  if (printType === "Berwarna") {
    harga = pageCount * 1500;
  } else if (printType === "Hitam-putih") {
    harga = pageCount * 1000;
  }

  setHargaPrint(harga);
  }, [pageCount, printType]);

  useEffect(() => {
    setTotalHarga(hargaPrint + 1000); 
  }, [hargaPrint]);

  const handleFormSubmit = (data: string) => {
    setPrintType(data);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Jika file adalah gambar atau PDF, tampilkan preview
      if (
        selectedFile.type.includes("image") ||
        selectedFile.type === "application/pdf"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null); // Tidak menampilkan preview jika bukan gambar/PDF
      }
    }
  };

  const uploadFileToServer = async () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = "/api/v1/upload";
      const { data: result } = await axios.post(apiUrl, formData);
      const fileId = result.data.id; 
      setPageCount(result.pageCount)
      setPrintType(sessionStorage.getItem("printType") || "")

      console.log("File ID:", fileId);
      sessionStorage.setItem("idFiles", fileId);
      sessionStorage.setItem("pageCount", String(pageCount));
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again later.");
    }
  };

  const getPayment = async () => {
    const idFiles = sessionStorage.getItem("idFiles");
    const idForms = sessionStorage.getItem("idForm");
    if (!idFiles || !idForms) {
      alert("Mulai dari awal");
      return;
    }
    console.log(idFiles, idForms);
    const apiUrl = "/api/v1/transaction";
    const { data: result } = await axios.post(apiUrl, {
      idFiles,
      idForms,
    });
    console.log("Data dari server:", result);
    const data = result.data;
    if (data.error) {
      console.error("Error:", data.error);
      alert("Terjadi kesalahan saat memproses pembayaran.");
      return;
    }

    return;
    const token = data.midtrans_token;
    const transactionId = data.id;
    console.log("Token Midtrans:", token);
    if (!token) {
      throw new Error("Token Midtrans tidak ditemukan.");
    }
    const updateTransaction = async (status: string) => {
      try {
        await axios.put(apiUrl, {
          idTransaction: transactionId,
          status,
        });
        console.log(`Transaksi diperbarui ke status: ${status}`);
      } catch (error) {
        console.error("Gagal memperbarui transaksi:", error);
      }
    };
    if (window.snap && window.snap.embed) {
      // Check if snap.embed is available
      window.snap.embed(token, {
        embedId: "snap-embed-container",
        // Removed `:any` here. TypeScript infers the type from the global declaration.
        onSuccess: async (result) => {
          await updateTransaction("paid");
          console.log("Pembayaran berhasil:", result);
          alert("Pembayaran berhasil!");
          sessionStorage.clear();
        },
        // Removed `:any` here. TypeScript infers the type from the global declaration.
        onPending: (result) => {
          console.log("Menunggu pembayaran:", result);
          alert("Pembayaran masih dalam proses.");
        },
        // Removed `:any` here. TypeScript infers the type from the global declaration.
        onError: (result) => {
          console.error("Pembayaran gagal:", result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: () => {
          console.warn("Popup ditutup tanpa menyelesaikan pembayaran.");
          alert("Anda belum menyelesaikan pembayaran.");
        },
      });
    } else {
      console.error("Midtrans Snap script not loaded.");
      alert("Payment system not available. Please try again later.");
    }
  };
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">PrintEZ</h1>

      <div className="flex flex-col items-center">
        {/* Sidebar Navigation */}
        {/* Versi Mobile (hanya step aktif) */}
        <div className="w-full flex md:hidden justify-center text-blue-950 p-4">
          {step === 1 && (
            <div className="flex items-center py-2 font-bold">
              <i className="bx bx-cloud-upload text-lg mr-2"></i>
              Unggah File
            </div>
          )}
          {step === 2 && (
            <div className="flex items-center py-2 font-bold">
              <i className="bx bx-spreadsheet text-lg mr-2"></i>
              Form Pemesanan
            </div>
          )}
          {step === 3 && (
            <div className="flex items-center py-2 font-bold">
              <i className="bx bx-wallet text-lg mr-2"></i>
              Pembayaran
            </div>
          )}
        </div>

        {/* Versi Desktop (semua langkah) */}
        <div className="w-full md:w-2xl hidden md:flex flex-row justify-between items-center text-blue-950 p-4">
          <div
            className={`flex items-center py-2 ${
              step === 1 ? "font-bold" : ""
            }`}
          >
            <i className="bx bx-cloud-upload text-lg mr-2"></i>
            Unggah File
          </div>
          <div
            className={`flex items-center py-2 ${
              step === 2 ? "font-bold" : ""
            }`}
          >
            <i className="bx bx-spreadsheet text-lg mr-2"></i>
            Form Pemesanan
          </div>
          <div
            className={`flex items-center py-2 ${
              step === 3 ? "font-bold" : ""
            }`}
          >
            <i className="bx bx-wallet text-lg mr-2"></i>
            Pembayaran
          </div>
        </div>

        {/* Step Content */}
        <div className="w-full md:w-2xl p-4">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl mb-2">Unggah Filemu</h2>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                className="border p-2 w-full"
              />

              {/* Tampilkan Preview File */}
              {preview ? (
                <div className="mt-4">
                  {file?.type.includes("image") ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      className="w-40 h-auto border p-2"
                    />
                  ) : file?.type === "application/pdf" ? (
                    <iframe
                      src={preview}
                      className="w-full h-56 border p-2"
                    ></iframe>
                  ) : null}
                </div>
              ) : file ? (
                <p className="mt-4 text-gray-600">{file.name}</p>
              ) : null}
              {/* Tampilkan tombol jika file sudah dipilih */}
              {file && (
                <Button
                  className="bg-blue-950"
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    await uploadFileToServer();
                    setIsLoading(false);
                    setStep(2);
                  }}
                >
                  Selanjutnya
                </Button>
              )}
            </div>
          )}

          {step === 2 && (
            <PrintForm onNext={() => setStep(3)} onBack={() => setStep(1)} formOnSubmit={handleFormSubmit}/>
          )}

          {step === 3 && (
            <div className="w-2xl bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Pembayaran
              </h2>

              <div id="detailPesanan" className="mb-5">
                <h3 className="font-bold text-gray-900">Rincian Harga</h3>
                <p className="ml-3">
                  Print {sessionStorage.getItem("printType")} : Rp.{" "}{hargaPrint}</p>
                <p className="ml-3">Biaya Admin : Rp. 1000</p>
                <p className="ml-3">Total Harga : Rp. {" "}{totalHarga}</p>
              </div>

              <div className="flex gap-4">
                <Button
                  className="bg-blue-950" //onClick={() => alert("Payment Successful!")}
                  onClick={async () => {
                    setIsLoading(true);
                    await getPayment();
                    setIsLoading(false);
                    setShowNoRek(true);
                  }}>
                  Konfirmasi Pembayaran
                </Button>

                <Button className="bg-blue-950" onClick={() => setStep(2)}>
                  Kembali
                </Button>
              </div>
              
              {showNoRek && (
                <>
                  <div id="no-rek-container" className="flex mt-7">
                    <Image src="/mandiri_logo.png" alt="No Rek" width={150} height={50} />
                    <div className="ml-5  ">
                      <p>1270011710686</p>
                      <p className="text-base font-bold text-gray-900">A.N. Riyan Suseno</p>
                    </div>
                  </div>
                  <p className="mt-3 text-base">Kirim bukti pembayaran ke nomor dibawah: </p>
                  <p className="text-sm">085888686197 atau klik tombol di bawah</p>
                  <Button
                    className="bg-blue-950 mt-3"
                    onClick={() => {
                      const nomor = "6285888686197"; // Ganti dengan nomor WhatsApp kamu (pakai kode negara, tanpa +)
                      const pesan = encodeURIComponent("Halo, saya ingin mengirim bukti pembayaran.");
                      window.open(`https://wa.me/${nomor}?text=${pesan}`, "_blank");
                    }}
                  >
                    Kirim Bukti Pembayaran
                  </Button>

                </>
              )}

              <div
                id="snap-embed-container"
                className="mt-4 w-full h-full"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintProcess;
