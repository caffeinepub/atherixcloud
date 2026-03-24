import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeonRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const ring4 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.4;
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.3;
      ring2.current.rotation.x += delta * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.y += delta * 0.25;
      ring3.current.rotation.z += delta * 0.1;
    }
    if (ring4.current) {
      ring4.current.rotation.x += delta * 0.2;
      ring4.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.018, 12, 100]} />
        <meshBasicMaterial color={0x00e5ff} transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.012, 12, 100]} />
        <meshBasicMaterial color={0xa855f7} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[1.85, 0.014, 12, 100]} />
        <meshBasicMaterial color={0x00e5ff} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring4} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[3.0, 0.008, 12, 100]} />
        <meshBasicMaterial color={0xa855f7} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function PulsingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.07;
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.08 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshBasicMaterial color={0x00e5ff} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function InnerGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 3]} />
        <meshBasicMaterial
          color={0x00e5ff}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial
          color={0x050d1a}
          emissive={0x051520}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

function ParticleCloud() {
  const count = 600;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    const positions: [number, number, number][] = [];
    const speeds: number[] = [];
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
      speeds.push(0.05 + Math.random() * 0.1);
    }
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const [x, y, z] = data.positions[i];
      const s = data.speeds[i];
      dummy.position.set(
        x + Math.sin(t * s + i) * 0.12,
        y + Math.cos(t * s * 0.7 + i) * 0.12,
        z,
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.04;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 4, 4]} />
      <meshBasicMaterial color={0x00e5ff} transparent opacity={0.7} />
    </instancedMesh>
  );
}

function SmallOrbiters() {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.5;
  });
  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const r = 2.8;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * r,
              Math.sin(angle * 0.7) * 0.4,
              Math.sin(angle) * r,
            ]}
          >
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshBasicMaterial color={i % 2 === 0 ? 0x00e5ff : 0xa855f7} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color={0x00e5ff} />
      <pointLight position={[-5, -3, -5]} intensity={1.2} color={0xa855f7} />
      <NeonRings />
      <PulsingIcosahedron />
      <InnerGlobe />
      <ParticleCloud />
      <SmallOrbiters />
    </Canvas>
  );
}
