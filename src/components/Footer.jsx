import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Contact Section - 80% width on desktop */}
      <section className="w-full bg-white md:pl-[20%]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Follow Section */}
            <div>
              <h5 className="font-zuumebold text-clamp-h5 text-primary mb-4 text-center">
                Follow Me
              </h5>

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <a
                  href="https://x.com/j_muhia?t=XUgGYtp6EuK84cOEpOCT-g&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                  Twitter
                </a>

                <a
                  href="https://www.instagram.com/jamesmuhia_?igsh=a3o1cTgybGRuZXVp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-instagram"></i>
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/share/1BCiERcd1M/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-square-facebook"></i>
                  Facebook
                </a>

                <a
                  href="https://youtube.com/@james_muhia?si=f0-V5S4VqriX5l8r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-youtube"></i>
                  YouTube
                </a>

                <a
                  href="https://www.threads.net/@jamesmuhia_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-threads"></i>
                  Threads
                </a>

                <a
                  href="https://www.tiktok.com/@wheelsnboots?_t=ZM-8ubT6XuVIhT&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 font-lora text-clamp-p-sm hover:text-dark transition text-decoration-none"
                >
                  <i className="fa-brands fa-tiktok"></i>
                  TikTok
                </a>
              </div>
            </div>


            {/* Contact Section */}
            <div className="text-center">
              <h5 className="font-zuumebold text-clamp-h5 text-primary text-center mb-4">Contact</h5>
              <p className="text-gray-700 font-lora text-clamp-p-sm">
                <i className="fa-solid fa-phone"></i> +254 717 291273
              </p>
              <p className="text-gray-700 font-lora text-clamp-p-sm">
                <i className="fa-regular fa-envelope"></i> info@wheelsnboots.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Section - 100% full width */}
      <footer className="w-full bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center font-lora text-clamp-p-sm text-gray-700">
            Wheels N' Boots ©{currentYear} all rights reserved
          </p>
        </div>
      </footer>
    </>
  )
}
