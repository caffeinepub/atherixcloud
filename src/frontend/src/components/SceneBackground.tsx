import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function StarField() {
  const count = 800;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const velocities = useMemo(() => {
    const vels = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vels[i * 3] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vels[i * 3 + 2] = 0;
    }
    return vels;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  // Initialize instanced mesh positions
  useMemo(() => {
    return positions; // trigger after mesh mount
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      // Wrap around
      if (positions[i * 3] > 60) positions[i * 3] = -60;
      if (positions[i * 3] < -60) positions[i * 3] = 60;
      if (positions[i * 3 + 1] > 60) positions[i * 3 + 1] = -60;
      if (positions[i * 3 + 1] < -60) positions[i * 3 + 1] = 60;

      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2],
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 4, 4]} />
      <meshBasicMaterial color={0xffffff} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function SceneBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        dpr={[1, 1]}
        frameloop="always"
        gl={{ antialias: false, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}
