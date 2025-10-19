'use client';

/**
 * LabSilhouettes — Faint lab equipment outlines for depth
 * Low opacity mechanical shapes with subtle parallax
 */

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { colors } from '@/lib/tokens';

export interface LabSilhouettesHandle {
  setBootIntensity: (intensity: number) => void;
}

interface LabSilhouettesProps {
  className?: string;
  enableParallax?: boolean;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
}

const LabSilhouettes = forwardRef<LabSilhouettesHandle, LabSilhouettesProps>(
  function LabSilhouettes({ className = '', enableParallax = true, mouseRef }, ref) {
    const intensityRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setBootIntensity: (intensity: number) => {
        intensityRef.current = Math.max(0, Math.min(1, intensity));
      },
    }));

    return (
      <div className={`fixed inset-0 ${className}`} style={{ zIndex: 1, pointerEvents: 'none' }}>
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, 10]}
            zoom={80}
          />
          <Silhouettes
            intensityRef={intensityRef}
            enableParallax={enableParallax}
            mouseRef={mouseRef}
          />
        </Canvas>
      </div>
    );
  }
);

// Silhouettes scene component
function Silhouettes({
  intensityRef,
  enableParallax,
  mouseRef,
}: {
  intensityRef: React.MutableRefObject<number>;
  enableParallax: boolean;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state) => {
    if (!groupRef.current) return;

    const intensity = intensityRef.current;

    // Subtle parallax drift
    if (enableParallax && intensity >= 0.5 && mouseRef) {
      const targetX = mouseRef.current.x * 0.3;
      const targetY = mouseRef.current.y * 0.2;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    }
  });

  const intensity = intensityRef.current;

  // Color transition blue → gold
  const blueColor = new THREE.Color(colors.electricBlue);
  const goldColor = new THREE.Color(colors.aurumGold);
  const outlineColor = blueColor.clone().lerp(goldColor, Math.min(intensity * 1.5, 1));

  // Very low opacity for subconscious effect
  const opacity = Math.min(intensity * 0.2, 0.15);

  return (
    <group ref={groupRef}>
      {/* Monitor screens (rectangles) */}
      <mesh position={[-6, 2, -8]}>
        <planeGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      <mesh position={[6, 1.5, -8]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      {/* Cables (thin cylinders) */}
      <mesh position={[-4, 0, -7]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      <mesh position={[4, -1, -7]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      {/* Robotic arm segments (simplified) */}
      <group position={[-3, -2, -6]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <meshBasicMaterial
            color={outlineColor}
            transparent
            opacity={opacity * 0.8}
            wireframe
          />
        </mesh>
        <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshBasicMaterial
            color={outlineColor}
            transparent
            opacity={opacity * 0.8}
            wireframe
          />
        </mesh>
      </group>

      {/* Data panels (hexagonal) */}
      <mesh position={[0, 3, -9]}>
        <circleGeometry args={[1.2, 6]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity}
          wireframe
        />
      </mesh>

      {/* Server rack outlines */}
      <group position={[5, -2, -8]}>
        <mesh>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshBasicMaterial
            color={outlineColor}
            transparent
            opacity={opacity * 0.7}
            wireframe
          />
        </mesh>
      </group>

      <group position={[-5, -2, -8]}>
        <mesh>
          <boxGeometry args={[0.8, 1.5, 0.4]} />
          <meshBasicMaterial
            color={outlineColor}
            transparent
            opacity={opacity * 0.7}
            wireframe
          />
        </mesh>
      </group>

      {/* Connection nodes (small spheres) */}
      <mesh position={[2, 0, -6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity * 1.5}
          wireframe
        />
      </mesh>

      <mesh position={[-2, 1, -6]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial
          color={outlineColor}
          transparent
          opacity={opacity * 1.5}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default LabSilhouettes;
