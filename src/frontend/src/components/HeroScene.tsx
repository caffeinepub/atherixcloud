import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function GlobeSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x += delta * 0.05;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.4;
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.3;
      ring2.current.rotation.x += delta * 0.1;
    }
    if (ring3.current) {
      ring3.current.rotation.y += delta * 0.2;
      ring3.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color={0x23e6e3}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 3]} />
        <meshPhongMaterial
          color={0x23e6e3}
          emissive={0x0a3340}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshPhongMaterial
          color={0x0b1e2d}
          emissive={0x051520}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.015, 16, 120]} />
        <meshBasicMaterial color={0x23e6e3} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.4, 0.01, 16, 120]} />
        <meshBasicMaterial color={0xa855f7} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[1.85, 0.012, 16, 120]} />
        <meshBasicMaterial color={0x23e6e3} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);
  const pointsRef = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current)
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={0x23e6e3}
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SmallOrbiters() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const r = 2.7;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * r,
              Math.sin(angle * 0.5) * 0.5,
              Math.sin(angle) * r,
            ]}
          >
            <boxGeometry args={[0.07, 0.07, 0.07]} />
            <meshBasicMaterial color={i % 2 === 0 ? 0x23e6e3 : 0xa855f7} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={0x23e6e3} />
      <pointLight position={[-5, -3, -5]} intensity={1} color={0xa855f7} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="white" />
      <GlobeSphere />
      <FloatingParticles />
      <SmallOrbiters />
    </Canvas>
  );
}
