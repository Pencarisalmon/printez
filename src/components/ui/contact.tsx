import "@/app/globals.css";
import Image from "next/image";
const Contact = () => {
  return (
    <div>
      <main
        className="pt-32 px-8 md:px-16 text-center animate-slide-left"
        id="contact"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Jangan Ragu Untuk Menghubungi Kami
          </h1>
          <p className="text-gray-600 mb-12">Kami akan selalu siap membantu.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition animate-slide-up">
              <div className="mb-4 text-2xl">
                <Image
                  src="/instagram-logo-240 (4).png"
                  alt="Instagram"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain mx-auto"
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">Instagram</h2>
              <p className="text-gray-600 text-sm mb-2">
                Dapatkan update terbaru dari kami.
              </p>
              <a
                href="link instagram"
                className="text-blue-600 font-medium hover:underline"
              >
                username ig printez
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition animate-slide-up">
              <div className="mb-4 text-2xl">
                <Image
                  src="/whatsapp-logo-240 (1).png"
                  alt="WhatsApp"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain mx-auto"
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">WhatsApp</h2>
              <p className="text-gray-600 text-sm mb-2">
                Hubungi kami jika anda memiliki keluhan.
              </p>
              <a
                href="link wa"
                className="text-blue-600 font-medium hover:underline"
              >
                nomor wa
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition animate-slide-up">
              <div className="mb-4 text-2xl">
                <Image
                  src="/Line.png"
                  alt="Line"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain mx-auto"
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">Line</h2>
              <p className="text-gray-600 text-sm mb-2">
                Hubungi kami, atau ikuti broadcastnya.
              </p>
              <a
                href="link line"
                className="text-blue-600 font-medium hover:underline"
              >
                line
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
