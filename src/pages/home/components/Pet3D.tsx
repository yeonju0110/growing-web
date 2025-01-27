/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PetModel, Loader } from './PetModel';

const Pet3D = ({
  url,
  size,
  onClick,
}: {
  url: string | undefined;
  size?: number;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);

  if (!show) return null;
  if (!url) return null;

  return (
    <Canvas
      ref={ref}
      style={{
        width: `${size ?? 200}px`,
        height: `${size ?? 200}px`,
      }}
      onClick={onClick}
    >
      <group dispose={null}>
        <ambientLight />
        <pointLight position={[10, 30, 40]} dispose={null} />
        <OrbitControls />
        <Suspense fallback={<Loader />}>
          <PetModel url={url} />
        </Suspense>
      </group>
    </Canvas>
  );
};

export default Pet3D;
