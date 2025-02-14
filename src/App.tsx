import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const texts = [
  "Hey Kashvi👋 (I really like your name btw)",
  "It's Valentine✨!!",
  "It would be too simple to just ask you out in chat",
  "It won't leave the impression 😓",
  "You Deserve Something Special 😍",
  "Because You are special 🥰",
  "Will You Be My Valentine? ",
];

export default function ValentineProposal() {
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 100, y: 0 }); // Ensuring No button starts separately

  useEffect(() => {
    if (index < texts.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 5000);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowButtons(true), 2000);
    }
  }, [index]);

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 300; // Random left/right movement
    const randomY = (Math.random() - 0.5) * 200; // Random up/down movement
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-200 text-gray-900 p-5 relative overflow-hidden">
      <audio autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-2xl"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
          animate={{
            y: [-10, -50, -100, -150, -200],
            opacity: [1, 0.8, 0.6, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Main Text */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center bg-white px-6 py-3 rounded-lg shadow-lg"
      >
        <Typewriter
          words={[texts[index]]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
        />
      </motion.div>

      {/* Yes / No Buttons for Final Question */}
      {showButtons && !yesClicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex gap-8 relative"
        >
          {/* Yes Button */}
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
            onClick={() => setYesClicked(true)}
          >
            Yes ❤️
          </button>

          {/* No Button (Moves Away) */}
          <motion.button
            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-lg absolute"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover} // Move on click too
          >
            No 💔
          </motion.button>
        </motion.div>
      )}

      {/* If "Yes" is clicked, show the response */}
      {yesClicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-2xl font-semibold text-center"
        >
          Nice Decision because I make really good pasta 😂
        </motion.div>
      )}
    </div>
  );
}
