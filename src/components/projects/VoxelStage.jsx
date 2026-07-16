import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const GRID_SIZE = 22;
const MAX_HEIGHT = 7;
const BLOCK_SIZE = 0.5;
const SPACING = 0.52;
const TERRAIN_BASE_Y = -2.4;
const CAMERA_START = [22, 10, 24];
const CAMERA_END = [11.5, 7.5, 14];
const LOOK_START = [0, TERRAIN_BASE_Y + 0.3, 0];
const LOOK_END = [0, TERRAIN_BASE_Y + 1.4, 0];
const TILT_LIMIT = Math.PI / 90;

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildHeights(seed) {
  const noise1 = createNoise2D(mulberry32(seed));
  const noise2 = createNoise2D(mulberry32(seed + 1));
  const noise3 = createNoise2D(mulberry32(seed + 2));
  const noise5 = createNoise2D(mulberry32(seed + 4));
  const heights = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    const row = [];
    for (let z = 0; z < GRID_SIZE; z++) {
      const nx = (x / GRID_SIZE - 0.5) * 2;
      const nz = (z / GRID_SIZE - 0.5) * 2;
      const base = (noise1(nx * 1.4, nz * 1.4) + 1) * 0.5;
      const detail = (noise2(nx * 3.6, nz * 3.6) + 1) * 0.5;
      const ridge =
        Math.pow(
            1 - Math.abs(noise3(nx * 2.2, nz * 2.2)),
            3
        );
      const dist = Math.sqrt(nx * nx + nz * nz);
      const falloff = 1 - Math.pow(Math.min(1, dist), 1.8) * 0.6;
      let h = (base * 0.55 + detail * 0.25 + ridge * 0.2) * MAX_HEIGHT;
      const valley = (noise5(nx * 0.8, nz * 0.8)+1)*0.5;

      h *= THREE.MathUtils.lerp(
          0.35,
          1,
          valley
      );
      row.push(Math.max(0, Math.min(MAX_HEIGHT, Math.round(h))));
    }
    heights.push(row);
  }
  return heights;
}

function TerrainInstances({ heights, progressRef, mouseRef, groupRef, idleRef, reduced }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const { instances, maxRadius } = useMemo(() => {
    const list = [];
    const offset = (GRID_SIZE - 1) * SPACING * 0.5;
    let maxR = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const h = heights[x][z];
        for (let y = 0; y <= h; y++) {
          const px = x * SPACING - offset;
          const pz = z * SPACING - offset;
          const py = y * SPACING + TERRAIN_BASE_Y + BLOCK_SIZE * 0.5;
          const r = Math.sqrt(px * px + pz * pz);
          if (r > maxR) maxR = r;
          list.push({ px, py, pz, r, h: y });
        }
      }
    }
    return { instances: list, maxRadius: maxR };
  }, [heights]);

  const geometry = useMemo(
    () => new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE),
    []
  );
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.78,
        metalness: 0.05,
      }),
    []
  );

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];
      if (reduced) {
        dummy.position.set(inst.px, inst.py, inst.pz);
        dummy.scale.setScalar(1);
      } else {
        dummy.position.set(inst.px, inst.py - 5, inst.pz);
        dummy.scale.setScalar(0);
      }
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const t = inst.h / MAX_HEIGHT;
      const l = 0.18 + t * 0.64;
      color.setRGB(l, l, l);
      meshRef.current.setColorAt(i, color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [instances, dummy, color, reduced]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (reduced) {
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.scale.setScalar(1);
      groupRef.current.rotation.set(0, 0, 0);
      return;
    }
    const t = performance.now() * 0.001;
    const idle = idleRef.current;

    const breathY = Math.sin(t * 0.5) * 0.04 * idle;
    const breathScale = 1 + Math.sin(t * 0.5) * 0.006 * idle;
    groupRef.current.position.y = breathY;
    groupRef.current.scale.setScalar(breathScale);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const targetY = mx * TILT_LIMIT;
    const targetX = -my * TILT_LIMIT;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
  });

  useFrame(() => {
    if (!meshRef.current) return;
    const progress = progressRef.current;
    if (progress >= 1) return;

    for (let i = 0; i < instances.length; i++) {
      const inst = instances[i];
      const t = (inst.r / maxRadius) * 0.55 + (inst.h / MAX_HEIGHT) * 0.45;
      const local = THREE.MathUtils.clamp(progress * 2.0 - t, 0, 1);
      const eased = 1 - Math.pow(1 - local, 3);
      const yDrop = (1 - eased) * 5;
      dummy.position.set(inst.px, inst.py - yDrop, inst.pz);
      dummy.scale.setScalar(eased);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, instances.length]}
        castShadow
        receiveShadow
      />
    </group>
  );
}

function CinematicCamera({ entranceRef, idleRef, reduced }) {
  const { camera } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    camera.position.set(...CAMERA_START);
    camera.lookAt(...LOOK_START);
  }, [camera]);

  useFrame((state) => {
    const aspect = state.size.width / Math.max(1, state.size.height);
    const targetFov = aspect < 0.9 ? 48 : aspect < 1.3 ? 38 : 32;
    if (Math.abs(camera.fov - targetFov) > 0.05) {
      camera.fov += (targetFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }

    if (reduced) {
      camera.position.set(...CAMERA_END);
      lookAt.set(...LOOK_END);
      camera.lookAt(lookAt);
      return;
    }

    const t = state.clock.elapsedTime;
    const entrance = entranceRef.current;
    const idle = idleRef.current;

    const baseX = THREE.MathUtils.lerp(CAMERA_START[0], CAMERA_END[0], entrance);
    const baseY = THREE.MathUtils.lerp(CAMERA_START[1], CAMERA_END[1], entrance);
    const baseZ = THREE.MathUtils.lerp(CAMERA_START[2], CAMERA_END[2], entrance);

    const bx = Math.sin(t * 0.18) * 0.2 * idle;
    const by = Math.sin(t * 0.22 + 1.0) * 0.1 * idle;
    const bz = Math.cos(t * 0.15) * 0.22 * idle;

    const tx = baseX + bx;
    const ty = baseY + by;
    const tz = baseZ + bz;

    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z += (tz - camera.position.z) * 0.04;

    const lx = THREE.MathUtils.lerp(LOOK_START[0], LOOK_END[0], entrance);
    const ly = THREE.MathUtils.lerp(LOOK_START[1], LOOK_END[1], entrance);
    const lz = THREE.MathUtils.lerp(LOOK_START[2], LOOK_END[2], entrance);
    lookAt.set(lx, ly, lz);
    camera.lookAt(lookAt);
  });

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.05}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0004}
        shadow-radius={4}
      />
      <directionalLight position={[-6, 4, -8]} intensity={0.22} />
      <Environment background={false} resolution={256}>
        <Lightformer
          position={[6, 8, 6]}
          intensity={1.1}
          color="#ffffff"
          scale={6}
          form="circle"
        />
        <Lightformer
          position={[-6, 4, -4]}
          intensity={0.45}
          color="#cccccc"
          scale={4}
          form="rect"
        />
        <Lightformer
          position={[0, -3, 0]}
          intensity={0.18}
          color="#888888"
          scale={10}
          form="rect"
        />
      </Environment>
    </>
  );
}

export default function VoxelStage() {
  const ref = useRef(null);
  const overlayRef = useRef(null);
  const groupRef = useRef();
  const progressRef = useRef(0);
  const entranceRef = useRef(0);
  const idleRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tweenState = useRef({ progress: 0, entrance: 0, idle: 0 });
  const reduced = usePrefersReducedMotion();

  const heights = useMemo(() => buildHeights(2026), []);

  useEffect(() => {
    if (reduced) {
      progressRef.current = 1;
      entranceRef.current = 1;
      idleRef.current = 0;
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '1';
        overlayRef.current.style.transform = 'translateY(0)';
      }
      return;
    }

    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0, y: 18 });
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      tl.to(
        tweenState.current,
        {
          progress: 1,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            progressRef.current = tweenState.current.progress;
          },
        },
        0
      );

      tl.to(
        tweenState.current,
        {
          entrance: 1,
          duration: 2.0,
          ease: 'power2.inOut',
          onUpdate: () => {
            entranceRef.current = tweenState.current.entrance;
          },
        },
        0
      );

      tl.to(
        tweenState.current,
        {
          idle: 1,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            idleRef.current = tweenState.current.idle;
          },
        },
        '-=0.8'
      );

      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=1.0'
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.x = (x - 0.5) * 2;
      mouseRef.current.y = (y - 0.5) * 2;
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={ref} className="voxel">
      <style>{`
        .voxel__stage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          max-height: 46vh;
          background: #0a0a0a;
          border-radius: 4px;
          overflow: hidden;
        }
        .voxel__stage canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
        .voxel__overlay {
          position: absolute;
          left: 1.5rem;
          bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          pointer-events: none;
          color: rgba(255, 255, 255, 0.88);
          font-family: var(--font-body, system-ui, sans-serif);
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
        }
        .voxel__overlay-meta {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.55;
        }
        .voxel__overlay-title {
          font-family: var(--font-heading, system-ui, sans-serif);
          font-size: clamp(1.2rem, 2.6vw, 1.8rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .voxel__overlay-hint {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.5;
        }
        @media (max-width: 600px) {
          .voxel__overlay { left: 1rem; bottom: 1rem; gap: 0.3rem; }
          .voxel__stage { max-height: 40vh; }
          .voxel__overlay-title { font-size: 1.1rem; }
        }
      `}</style>
      <div className="voxel__stage">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: CAMERA_START, fov: 32, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <fog attach="fog" args={['#ffffff', 20, 42]} />
          <Lights />
          <ContactShadows
            position={[0, TERRAIN_BASE_Y - 0.01, 0]}
            opacity={0.6}
            scale={20}
            blur={2.4}
            far={4}
            resolution={1024}
            color="#000000"
          />
          <TerrainInstances
            heights={heights}
            progressRef={progressRef}
            mouseRef={mouseRef}
            groupRef={groupRef}
            idleRef={idleRef}
            reduced={reduced}
          />
          <CinematicCamera
            entranceRef={entranceRef}
            idleRef={idleRef}
            reduced={reduced}
          />
        </Canvas>
      </div>
    </div>
  );
}
