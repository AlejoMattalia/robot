import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export function Robot({ play }: { play: boolean }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/robot_dance.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first available animation when the model is loaded

    if (play && actions) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions, play]);

  // Enabling shadows for the robot

  return (
    <>
      <group
        ref={group}
        scale={[4, 4, 4]}
        dispose={null}
        position={[0, play ? 0 : 4.4, 0]}
      >
        <primitive object={clone} />
      </group>
    </>
  );
}

useGLTF.preload("/robot_dance.glb");
