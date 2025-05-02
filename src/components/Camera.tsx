import { PerspectiveCamera } from "@react-three/drei";

export const Camera = () => {
  return <PerspectiveCamera makeDefault position={[0, 5, 30]} fov={48} />;
};
