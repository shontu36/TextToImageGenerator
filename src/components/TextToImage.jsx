import React, { useState } from "react";
import axios from "axios";
import { Client } from "@gradio/client";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const client = await Client.connect("black-forest-labs/FLUX.1-dev");
      const result = await client.predict("/infer", {
        prompt: prompt,
        seed: 0,
        randomize_seed: true,
        width: 256,
        height: 256,
        guidance_scale: 1,
        num_inference_steps: 1,
      });

      setImageUrl(result.data);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Text to Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Generated" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default TextToImage;
