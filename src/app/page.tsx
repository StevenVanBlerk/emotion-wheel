import Image from "next/image";
import { EmotionWheel } from "./components";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-5xl font-mono text-sm lg:flex">
        <Image
          src="/emotion_wheel.jpeg"
          alt="Vercel Logo"
          width={500}
          height={500}
          priority
        />
        <EmotionWheel />
      </div>
      <div></div>
      <div>
        Embarrassed
        <br />
        Frustrated
        <br />
        Hurt
        <br />+
      </div>
      <div className="mt-8">
        Why am I feeling this way?
        <input type="text" /> 🕒
        <button className="ml-8 rounded border-2 bg-gray-500">
          I'm ready to move on
        </button>
      </div>
      <div className="mt-8">
        What can I do with this feeling?
        <input type="text" /> 🕒
        <button className="ml-8 rounded border-2 bg-gray-500">
          I'm ready to move on
        </button>
      </div>
      <div className="mt-8">
        Do I need help with this?
        <input type="text" /> 🕒
        <button className="ml-8 rounded border-2 bg-gray-500">
          I'm ready to move on
        </button>
      </div>
      <div className="mt-8">
        Who can help me with this?
        <input type="text" /> 🕒
        <button className="ml-8 rounded border-2 bg-gray-500">
          I'm ready to move on
        </button>
      </div>
    </main>
  );
}
