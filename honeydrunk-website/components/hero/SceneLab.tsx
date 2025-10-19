'use client';

/**
 * SceneLab — R3F procedural lab scene
 * Neon strips, panels, and robotic arm silhouettes with intensity control
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { colors } from '@/lib/tokens';

export interface SceneLabHandle {
  setBootIntensity: (intensity: number) => void;
}

interface SceneLabProps {
  className?: string;
  enableParallax?: boolean;
}

const SceneLab = forwardRef<SceneLabHandle, SceneLabProps>(
  function SceneLab({ className = '', enableParallax = true }, ref) {
    const intensityRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
      setBootIntensity: (intensity: number) => {
        intensityRef.current = Math.max(0, Math.min(1, intensity));
      },
    }));

    // Track mouse position for parallax
    useEffect(() => {
      if (!enableParallax) return;

      const handleMouseMove = (e: MouseEvent) => {
        // Normalize to -1 to 1
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enableParallax]);

    return (
      <div className={`fixed inset-0 ${className}`} style={{ zIndex: 0 }}>
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, 10]}
            zoom={100}
          />
          <ambientLight intensity={0.1} />
          <Lab
            intensityRef={intensityRef}
            enableParallax={enableParallax}
            mouseRef={mouseRef}
          />

          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
            <Vignette
              offset={0.3}
              darkness={0.5}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Canvas>
      </div>
    );
  }
);

// Lab scene component
function Lab({
  intensityRef,
  enableParallax,
  mouseRef,
}: {
  intensityRef: React.MutableRefObject<number>;
  enableParallax: boolean;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse-based parallax rotation (1-2° tilt)
    if (enableParallax && intensityRef.current >= 1) {
      const maxTilt = (2 * Math.PI) / 180; // 2 degrees in radians
      const targetRotationY = mouseRef.current.x * maxTilt;
      const targetRotationX = mouseRef.current.y * maxTilt * 0.5;

      // Smoothly interpolate rotation
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;

      // Idle parallax sway (very subtle, combines with mouse parallax)
      const time = state.clock.getElapsedTime();
      groupRef.current.position.x = Math.sin(time * 0.2) * 0.1;
      groupRef.current.position.y = Math.cos(time * 0.3) * 0.05;
    }
  });

  const intensity = intensityRef.current;
  const showParticles = intensity >= 0.5; // Show particles once lab starts lighting up

  // Parse colors
  const blueColor = new THREE.Color(colors.electricBlue);
  const goldColor = new THREE.Color(colors.aurumGold);

  // Color transition blue → gold
  const emissiveColor = blueColor.clone().lerp(goldColor, Math.min(intensity * 1.5, 1));

  return (
    <group ref={groupRef}>
      {/* Back wall panels */}
      <mesh position={[-3, 0, -5]}>
        <planeGeometry args={[2, 4]} />
        <meshStandardMaterial
          color={colors.gunmetal}
          emissive={emissiveColor}
          emissiveIntensity={intensity * 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[3, 0, -5]}>
        <planeGeometry args={[2, 4]} />
        <meshStandardMaterial
          color={colors.gunmetal}
          emissive={emissiveColor}
          emissiveIntensity={intensity * 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Neon light strips */}
      <NeonStrip
        position={[-4, 2, -4]}
        width={8}
        intensity={intensity}
        color={emissiveColor}
      />
      <NeonStrip
        position={[-4, -2, -4]}
        width={8}
        intensity={intensity}
        color={emissiveColor}
      />
      <NeonStrip
        position={[4, 2, -4]}
        width={8}
        intensity={intensity}
        color={emissiveColor}
      />

      {/* Robotic arms (simplified silhouettes) */}
      <RoboticArm
        position={[-2.5, -1, -2]}
        intensity={intensity}
        color={emissiveColor}
        enableSway={enableParallax}
      />
      <RoboticArm
        position={[2.5, -1, -2]}
        intensity={intensity}
        color={emissiveColor}
        enableSway={enableParallax}
        swayPhase={Math.PI}
      />

      {/* Floor grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={colors.deepSpace}
          emissive={emissiveColor}
          emissiveIntensity={intensity * 0.1}
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Ambient particles (glowing dust) */}
      {showParticles && (
        <AmbientParticles
          count={30}
          intensity={intensity}
          color={emissiveColor}
          enableMotion={enableParallax}
        />
      )}

      {/* Micro sparks (tiny particles near center) */}
      {intensity >= 0.8 && (
        <MicroSparks
          count={8}
          intensity={intensity}
          color={goldColor}
          enableMotion={enableParallax}
        />
      )}
    </group>
  );
}

// Neon strip component
function NeonStrip({
  position,
  width,
  intensity,
  color,
}: {
  position: [number, number, number];
  width: number;
  intensity: number;
  color: THREE.Color;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.1, 0.1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity * 2}
        toneMapped={false}
      />
    </mesh>
  );
}

// Robotic arm component (simplified)
function RoboticArm({
  position,
  intensity,
  color,
  enableSway,
  swayPhase = 0,
}: {
  position: [number, number, number];
  intensity: number;
  color: THREE.Color;
  enableSway: boolean;
  swayPhase?: number;
}) {
  const armRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!armRef.current || !enableSway || intensity < 1) return;

    const time = state.clock.getElapsedTime();
    armRef.current.rotation.z = Math.sin(time * 0.5 + swayPhase) * 0.05;
  });

  return (
    <group ref={armRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 8]} />
        <meshStandardMaterial
          color={colors.graphite}
          emissive={color}
          emissiveIntensity={intensity * 0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Arm segment 1 */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.2, 1.5, 0.2]} />
        <meshStandardMaterial
          color={colors.graphite}
          emissive={color}
          emissiveIntensity={intensity * 0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Arm segment 2 */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial
          color={colors.graphite}
          emissive={color}
          emissiveIntensity={intensity * 0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Effector/gripper */}
      <mesh position={[0.3, 2.5, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity * 1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Ambient particles component (glowing dust)
function AmbientParticles({
  count,
  intensity,
  color,
  enableMotion,
}: {
  count: number;
  intensity: number;
  color: THREE.Color;
  enableMotion: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<Array<{ position: THREE.Vector3; velocity: THREE.Vector3; phase: number }>>([]);

  // Initialize particle data
  useEffect(() => {
    if (!meshRef.current) return;

    const particles: Array<{ position: THREE.Vector3; velocity: THREE.Vector3; phase: number }> = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        Math.random() * 0.005 + 0.005, // Upward drift
        (Math.random() - 0.5) * 0.01
      );

      particles.push({
        position,
        velocity,
        phase: Math.random() * Math.PI * 2,
      });

      dummy.position.copy(position);
      dummy.scale.setScalar(0.05 + Math.random() * 0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    particlesRef.current = particles;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current || !enableMotion) return;

    const dummy = new THREE.Object3D();
    const time = state.clock.getElapsedTime();

    particlesRef.current.forEach((particle, i) => {
      // Update position
      particle.position.add(particle.velocity);

      // Add gentle drift
      particle.position.x += Math.sin(time * 0.5 + particle.phase) * 0.002;
      particle.position.z += Math.cos(time * 0.3 + particle.phase) * 0.002;

      // Wrap around if particle drifts too far up
      if (particle.position.y > 4) {
        particle.position.y = -4;
      }

      // Wrap around horizontal bounds
      if (Math.abs(particle.position.x) > 6) {
        particle.position.x = -particle.position.x;
      }
      if (Math.abs(particle.position.z) > 3) {
        particle.position.z = -particle.position.z;
      }

      // Update matrix
      dummy.position.copy(particle.position);
      dummy.scale.setScalar((0.05 + Math.sin(time + particle.phase) * 0.02) * intensity);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity * 3}
        toneMapped={false}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

// Micro sparks component (tiny 1-2px particles)
function MicroSparks({
  count,
  intensity,
  color,
  enableMotion,
}: {
  count: number;
  intensity: number;
  color: THREE.Color;
  enableMotion: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const sparksRef = useRef<Array<{ position: THREE.Vector3; velocity: THREE.Vector3; phase: number; lifetime: number }>>([]);

  // Initialize micro sparks
  useEffect(() => {
    if (!meshRef.current) return;

    const sparks: Array<{ position: THREE.Vector3; velocity: THREE.Vector3; phase: number; lifetime: number }> = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 4, // Near center
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        Math.random() * 0.01 + 0.01, // Upward drift
        (Math.random() - 0.5) * 0.003
      );

      sparks.push({
        position,
        velocity,
        phase: Math.random() * Math.PI * 2,
        lifetime: Math.random() * 8 + 4, // 4-12 seconds
      });

      dummy.position.copy(position);
      dummy.scale.setScalar(0.02); // Very small
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    sparksRef.current = sparks;
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  // Animate micro sparks
  useFrame((state) => {
    if (!meshRef.current || !enableMotion) return;

    const dummy = new THREE.Object3D();
    const time = state.clock.getElapsedTime();

    sparksRef.current.forEach((spark, i) => {
      // Update position
      spark.position.add(spark.velocity);

      // Add subtle drift
      spark.position.x += Math.sin(time * 0.3 + spark.phase) * 0.001;

      // Reset if drifted too far up
      if (spark.position.y > 4) {
        spark.position.y = -4;
        spark.position.x = (Math.random() - 0.5) * 4;
        spark.position.z = (Math.random() - 0.5) * 2;
      }

      // Flicker effect
      const flicker = 0.5 + Math.sin(time * 2 + spark.phase) * 0.5;
      const scale = 0.02 * flicker * intensity;

      dummy.position.copy(spark.position);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial
        color={color}
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}

export default SceneLab;
