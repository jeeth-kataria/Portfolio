import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function MatrixNodes() {
  const ref = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const count = 300;
  const maxDistance = 2.5;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, [count]);

  useFrame((state) => {
    if (!ref.current || !lineRef.current) return;

    const posAttr = ref.current.geometry.attributes.position;
    const lineIndices = [];
    
    // Update positions and find connections
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Drift
      posAttr.array[ix] += velocities[ix];
      posAttr.array[iy] += velocities[iy];
      posAttr.array[iz] += velocities[iz];

      // Bounce back
      if (Math.abs(posAttr.array[ix]) > 7.5) velocities[ix] *= -1;
      if (Math.abs(posAttr.array[iy]) > 7.5) velocities[iy] *= -1;
      if (Math.abs(posAttr.array[iz]) > 7.5) velocities[iz] *= -1;

      // Mouse influence
      const mx = (mouse.current.x * viewport.width) / 2;
      const my = (mouse.current.y * viewport.height) / 2;
      const dx = posAttr.array[ix] - mx;
      const dy = posAttr.array[iy] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        posAttr.array[ix] += dx * 0.01;
        posAttr.array[iy] += dy * 0.01;
      }
    }
    posAttr.needsUpdate = true;

    // Connections (limited for performance)
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < maxDistance * maxDistance) {
          lineIndices.push(i, j);
        }
      }
    }

    lineRef.current.geometry.setIndex(lineIndices);
    const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    linePosAttr.array = posAttr.array;
    linePosAttr.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FFB000"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FFB000" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export default function NeuralMatrix() {
  return (
    <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <MatrixNodes />
      </Canvas>
    </div>
  );
}
