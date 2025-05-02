import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import { DiscoLights } from "./components/DiscoLights";
import { DiscoBall } from "./components/DiscoBall";
import { Robot } from "./components/Robot";
import { Floor } from "./components/Floor";
import { Camera } from "./components/Camera";
import { ButtonPlay } from "./components/ButtonPlay";
import { SongSelector } from "./components/SongSelector";

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState(false);
  const [song, setSong] = useState<string | null>("/song1.mp3");

  const handlePlay = () => {
    if (!song) return;
    setPlay(true);
    audioRef.current?.play().catch((err) => {
      console.log("No se pudo reproducir el audio:", err);
    });
  };

  const handleSelectSong = (src: string) => {
    setSong(src);
    setTimeout(() => handlePlay(), 500); // Pequeña demora para que cargue bien la canción
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <audio ref={audioRef} src={song || undefined} loop />

        <Canvas shadows>
          <Suspense fallback={null}>
            <Camera />
            <fog attach="fog" args={["#000000", 30, 100]} />

            <ambientLight intensity={0.5} />

            <DiscoLights play={play} />
            <DiscoBall play={play} />
            <Robot play={play} />
            <Floor />

            {!play ? (
              <ButtonPlay onClick={handlePlay} visible={true} />
            ) : (
              <SongSelector onSelect={handleSelectSong} visible={true} />
            )}

            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>

      <Loader />
    </>
  );
}
