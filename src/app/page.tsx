import Image from "next/image";
import "@/app/globals.css";
import Navbar from "@/components/ui/navbar";
import AboutPage from "@/components/ui/aboutUs";
import OurService from "@/components/ui/ourService";
import Contact from "@/components/ui/contact";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center px-4 md:px-16 min-h-screen">
        {/* Text Content */}
        <div className="w-full md:w-1/2 animate-slide-up text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Layanan Jasa Titip Print Mudah dan Cepat!
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
            Kami menyediakan jasa titip print berkualitas untuk mahasiswa. Cukup
            unggah dokumen Anda, kami yang akan mencetak dan mengantarkannya
            untuk Anda.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="/print">
              <button className="bg-blue-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900">
                Coba Sekarang
              </button>
            </a>
          </div>
        </div>

        {/* Image (Hidden on Mobile) */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center animate-slide-left">
          <Image
            src="/hero.svg"
            alt="Ilustrasi jasa print"
            width={735} 
            height={684} 
            className="w-[450px] h-auto"
          />
        </div>
      </div>

      <AboutPage />
      <OurService />
      <Contact />
    </div>
  );
}
