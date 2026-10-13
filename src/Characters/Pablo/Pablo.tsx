import React from 'react';
import { useFrame } from '@react-three/fiber';

export const Pablo = () => {
  return (
    <group>
      {/* Black (light-skin) short man, 4 feet tall */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#8d5524" />
      </mesh>
      {/* Red romper suit with black zigzags */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1.05, 2, 1.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Black boots */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.1, 1, 1.1]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Cowboy hat with blue and yellow stripes */}
      <mesh position={[0, 4.2, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 0.5, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
};
