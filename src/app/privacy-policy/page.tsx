import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Bloomweaver AI Chat",
  description: "Privacy Policy for Bloomweaver AI Chat",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gray-900">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">
          Privacy Policy
        </h1>

        <div className="space-y-8">
          <section className="border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all bg-gray-800">
            <div className="flex items-start mb-4">
              <div className="mr-4 mt-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-900 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                  Overview
                </h2>
                <p className="text-gray-300">
                  This Privacy Policy explains how we collect, use, and protect
                  your information when you use our AI chat service. Our service is designed to learn and improve through conversations, which requires storing chat data.
                </p>
              </div>
            </div>
          </section>

          <section className="border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all bg-gray-800">
            <div className="flex items-start mb-4">
              <div className="mr-4 mt-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-900 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                  Information We Collect
                </h2>
              </div>
            </div>

            <ul className="space-y-4 ml-12">
              <li className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                <span className="font-medium text-blue-400 block mb-1">
                  Chat Messages
                </span>
                <p className="text-gray-300">
                  All chat messages are stored in our secure databases (AWS and Pinecone) to enable the AI's learning capabilities and provide personalized interactions.
                </p>
              </li>
              <li className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                <span className="font-medium text-blue-400 block mb-1">
                  Conversation History
                </span>
                <p className="text-gray-300">
                  Your complete conversation history is maintained to improve the AI's context understanding and response quality.
                </p>
              </li>
              <li className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                <span className="font-medium text-blue-400 block mb-1">
                  Usage Data
                </span>
                <p className="text-gray-300">
                  We collect usage data to improve our service and ensure optimal performance.
                </p>
              </li>
              <li className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                <span className="font-medium text-blue-400 block mb-1">
                  User Authentication
                </span>
                <p className="text-gray-300">
                  Authentication is handled by Clerk. We store your user ID to manage your chat history and personalization.
                </p>
              </li>
            </ul>
          </section>

          <section className="border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all bg-gray-800">
            <div className="flex items-start mb-4">
              <div className="mr-4 mt-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-900 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                  Data Security
                </h2>
                <p className="text-gray-300">
                  Your data is securely stored in AWS and Pinecone databases with industry-standard encryption and security measures. We never sell or share your data with third parties. Your conversations are used solely for improving our AI service and providing you with better responses.
                </p>
              </div>
            </div>
          </section>

          <section className="border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all bg-gray-800">
            <div className="flex items-start mb-4">
              <div className="mr-4 mt-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-900 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12" />
                  <path d="m8 11 4 4 4-4" />
                  <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                  Changes to This Policy
                </h2>
                <p className="text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </div>
            </div>
          </section>

          <section className="border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all bg-gray-800">
            <div className="flex items-start mb-4">
              <div className="mr-4 mt-1 h-8 w-8 flex items-center justify-center rounded-md bg-blue-900 text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                  Contact Us
                </h2>
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
