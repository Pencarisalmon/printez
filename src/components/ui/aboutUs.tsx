import "@/app/globals.css";
import Image from "next/image";
const AboutPage = () => {
  return (
    <div id="about">
      <main className="pt-32 px-8 md:px-16 text-center animate-slide-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-12">Meet Our Team</h1>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-44 sm:w-52 mt-0 group animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-md h-80 w-full">
              <Image
                src="/ares.jpg"
                alt="Ares"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white text-left p-4">
                  <p className="font-semibold">
                    Muhammad Rizki Ramadhan Siregar
                  </p>
                  <p className="text-sm">Project Officer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-44 sm:w-52 mt-12 group animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-md h-80 w-full">
              <Image
                src="/rizky.jpg"
                alt="Ridan"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white text-left p-4">
                  <p className="font-semibold">Rizky Ramadan</p>
                  <p className="text-sm">Front-End Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-44 sm:w-52 mt-6 group animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-md h-80 w-full">
              <Image
                src="/seno.jpg"
                alt="Seno"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white text-left p-4">
                  <p className="font-semibold">Riyan Suseno</p>
                  <p className="text-sm">Back-End Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-44 sm:w-52 mt-12 group animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-md h-80 w-full">
              <Image
                src="/haikal.jpg"
                alt="Hekal"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white text-left p-4">
                  <p className="font-semibold">Hayqal Salman Azrian</p>
                  <p className="text-sm">Back-End Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-44 sm:w-52 mt-0 group animate-slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-md h-80 w-full">
              <Image
                src="/iqbal.jpg"
                alt="Iqbal"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="text-white text-left p-4">
                  <p className="font-semibold">Iqbal Fardhani Pohan</p>
                  <p className="text-sm">Front-End Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="max-w-4xl mx-auto mt-12 text-gray-700 leading-relaxed animate-slide-left">
          PrintEz adalah layanan cetak modern yang memudahkan mahasiswa untuk
          mencetak dokumen dengan cepat, mudah, dan efisien melalui platform
          online kami.
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
