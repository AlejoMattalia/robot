import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export function ButtonPlay({
  onClick,
  visible,
}: {
  onClick: () => void;
  visible: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [baseY] = useState(8);
  const [baseX] = useState(15);
  const [baseZ] = useState(-8);

  useFrame(() => {
    if (meshRef.current) {
      const time = Date.now() * 0.001;
      const newX = baseX + Math.cos(time) * 0.3;
      const newY = baseY + Math.sin(time * 2) * 0.2;
      const newZ = baseZ;
      meshRef.current.position.set(newX, newY, newZ);
      meshRef.current.lookAt(new THREE.Vector3(0, newY, 0));
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
    <mesh
      ref={meshRef}
      position={[baseX, baseY, baseZ]}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[3.3, 1.8, 0.2]} />
      <meshStandardMaterial color="black" />
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        ▶ PLAY
      </Text>
    </mesh>
  );
}
