export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-2 gap-10 h-screen bg-[#FCFCFC] p-6">
      <div
        className={`rounded-2xl h-full w-full flex items-end bg-gray-400 bg-cover bg-center overflow-hidden`}
        style={{ backgroundImage: "url(/images/auth-image.png)" }}
      >
        <div className="w-full p-6 bg-gradient-to-t from-black to-transparent">
          <div>
            <p className="mb-2 text-4xl text-white font-semibold tracking-wide">
              Empowering Pharma
            </p>
            <p className="mb-2 text-4xl text-white font-semibold tracking-wide">
              Professionals to
            </p>
          </div>
          <p className="font-general-semibold text-5xl text-primary uppercase">
            Connect & Grow
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-5">
        {children}
      </div>
    </div>
  );
}
