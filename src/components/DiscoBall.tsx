import { useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DiscoBall({
  speed = 0.01,
  play,
}: {
  speed?: number;
  play: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const fbx = useFBX("/disco_ball.fbx");

  useEffect(() => {
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        new THREE.MeshStandardMaterial({
          color: "white",
          metalness: 1,
          roughness: 0.1,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [fbx]);

  useFrame(() => {
    if (meshRef.current && play) {
      meshRef.current.rotation.y += speed;
    }
  });

  return (
    <primitive
      object={fbx}
      ref={meshRef}
      position={[0, 16, 0]}
      scale={[0.05, 0.05, 0.05]} // Escala ajustada
      castShadow
    />
  );
}

useFBX.preload("/disco_ball.fbx");
