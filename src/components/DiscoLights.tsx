import { useEffect, useState } from "react";

export function DiscoLights({ play }: { play: boolean }) {
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        const colors = ["#FF66FF", "#66FFFF", "#FFFF66", "#FF6666"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
      } else {
        setColor("#66FFFF");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [play]);

  return (
    <>
      <pointLight
        position={[0, 5, 0]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
        castShadow
      />
      <pointLight
        position={[0, 30, 0]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
      />
      <pointLight
        position={[30, 15, 0]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
        castShadow
      />
      <pointLight
        position={[-30, 15, 0]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
        castShadow
      />
      <pointLight
        position={[0, 15, 30]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
        castShadow
      />
      <pointLight
        position={[0, 15, -30]}
        intensity={100}
        decay={1}
        distance={100}
        color={color}
        castShadow
      />
    </>
  );
}
