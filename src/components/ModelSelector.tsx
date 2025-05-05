"use client";

import { useState, useEffect } from "react";
import {
  GROQ_MODELS,
  ModelTier,
  isModelAvailableForTier,
} from "@/lib/groq-models";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  userTier: ModelTier;
}

export default function ModelSelector({
  selectedModel,
  onModelChange,
  userTier,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Find the selected model
  const currentModel =
    GROQ_MODELS.find((model) => model.id === selectedModel) || GROQ_MODELS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-700 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700"
      >
        <div className="flex items-center">
          <span className="mr-2">{currentModel.name}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60">
          <ul className="py-1">
            {GROQ_MODELS.map((model) => {
              // Check if the model is available for the user's tier
              const isUnavailable = !isModelAvailableForTier(
                model.id,
                userTier
              );

              return (
                <li key={model.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isUnavailable) {
                        onModelChange(model.id);
                        setIsOpen(false);
                      }
                    }}
                    className={`flex flex-col w-full px-3 py-2 text-left hover:bg-gray-700 ${
                      selectedModel === model.id ? "bg-gray-700" : ""
                    } ${isUnavailable ? "opacity-60 cursor-not-allowed" : ""} text-gray-200`}
                    disabled={isUnavailable}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{model.name}</span>
                      {isUnavailable && (
                        <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded-full text-gray-200">
                          {userTier === "free"
                            ? "Basic or Premium"
                            : userTier === "basic"
                            ? "Premium required"
                            : ""}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {model.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
