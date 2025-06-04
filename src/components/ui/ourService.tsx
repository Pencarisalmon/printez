import "@/app/globals.css";
import Image from "next/image";
const OurService = () => {
  return (
    <div>
      <main
        className="pt-32 px-8 md:px-16 text-center animate-slide-left"
        id="services"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-12">Layanan Kami</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md text-left hover:shadow-lg transition animate-slide-up">
            <Image
              src="/file-pdf-solid-240.png"
              alt="Icon"
              width={48}
              height={48}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Submit Dokumen Online
            </h2>
            <p className="text-gray-600">
              Submit dokumen anda melalui website kami, simpel dan praktis!
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-left hover:shadow-lg transition animate-slide-up">
            <Image
              src="/color-fill-solid-240.png"
              alt="Icon"
              width={48}
              height={48}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Cetak Warna dan Hitam-Putih
            </h2>
            <p className="text-gray-600">Kami mengakomodir preferensi anda!</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-left hover:shadow-lg transition animate-slide-up">
            <Image
              src="/package-regular-240.png"
              alt="Icon"
              width={48}
              height={48}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Ambil di Tempat yang Anda Inginkan
            </h2>
            <p className="text-gray-600">Pilih dari 3 lokasi pengambilan!</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-left hover:shadow-lg transition animate-slide-up">
            <Image
              src="/wallet-alt-solid-240.png"
              alt="Icon"
              width={48}
              height={48}
              className="w-12 h-12 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Pembayaran Secara Online
            </h2>
            <p className="text-gray-600">
              Pembayaran menjadi mudah, praktis, akurat dan aman!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurService;
