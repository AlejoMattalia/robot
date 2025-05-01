import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const songs = [
  { title: "Titanium", file: "/song1.mp3" },
  { title: "Lean On", file: "/song2.mp3" },
  { title: "Wake Me Up", file: "/song3.mp3" },
];

export function SongSelector({
  onSelect,
  visible,
}: {
  onSelect: (src: string) => void;
  visible: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const [baseY] = useState(10);
  const [baseX] = useState(15);
  const [baseZ] = useState(-8);

  useFrame(() => {
    if (groupRef.current) {
      const time = Date.now() * 0.001;
      const newY = baseY + Math.sin(time * 2) * 0.2;
      groupRef.current.position.set(baseX, newY, baseZ);

      // Hacer que mire hacia el centro de la escena (puede ser [0, newY, 0] o cualquier punto)
      groupRef.current.lookAt(new THREE.Vector3(5, newY, 0));
    }
  });

  if (!visible) return null;

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <group ref={groupRef}>
      {songs.map((song, index) => (
        <mesh
          key={song.title}
          position={[0, -index * 2.2, 0]}
          onClick={() => onSelect(song.file)}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[5, 1.5, 0.2]} />
          <meshStandardMaterial color="transparent" />
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.4}
            color="black"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            {song.title}
          </Text>
        </mesh>
      ))}
    </group>
  );
}
