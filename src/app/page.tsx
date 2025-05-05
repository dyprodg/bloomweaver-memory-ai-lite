import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-6 text-center bg-gray-900">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex justify-center mb-6">
          <Image
            src="/bloomweaver_logo.svg"
            alt="Bloomweaver Logo"
            width={200}
            height={200}
            priority
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-[200px] md:h-[200px]"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
            Bloomweaver
          </span>
          <span className="text-white"> Memory AI</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-gray-300 max-w-lg mx-auto">
          Advanced AI chat platform for intelligent conversations with knowledge memory, powered by{" "}
          <span className="text-blue-400 font-semibold">Bloomweaver.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-up"
            className="px-6 sm:px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors duration-200 shadow-lg w-full sm:w-auto"
          >
            Start Chatting
          </Link>

          <Link
            href="/sign-in"
            className="px-6 sm:px-8 py-3 rounded-full border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
