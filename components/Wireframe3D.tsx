'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Shape() {
    const meshRef = useRef<THREE.Group>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const targetX = state.pointer.x / 2;

        meshRef.current.position.x = THREE.MathUtils.lerp(
            meshRef.current.position.x,
            targetX,
            0.05
        );

        const targetY = state.pointer.y / 3;

        meshRef.current.position.y = THREE.MathUtils.lerp(
            meshRef.current.position.y,
            targetY,
            0.05
        );

        meshRef.current.rotation.x -= 0.0001;
        meshRef.current.rotation.y += 0.0004;
    });

    if (!mounted) return null;

    return (
        <group ref={meshRef}>
            <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.02}>
                <mesh>
                    <sphereGeometry args={[12, 64, 64]} />
                    <meshBasicMaterial
                        wireframe
                        color="#a855f7"
                        transparent
                        opacity={0.08}
                    />
                </mesh>

                <mesh rotation={[0, Math.PI / 8, 0]}>
                    <sphereGeometry args={[12.1, 32, 32]} />
                    <meshBasicMaterial
                        wireframe
                        color="#6366f1"
                        transparent
                        opacity={0.05}
                    />
                </mesh>

                <Sphere args={[11.8, 64, 64]}>
                    <meshLambertMaterial
                        color="#4c1d95"
                        transparent
                        opacity={0.03}
                    />
                </Sphere>

                <group rotation={[Math.PI / 2, 0, 0]}>
                    {[...Array(5)].map((_, i) => (
                        <mesh key={i} position={[0, 0, (i - 2) * 2.5]}>
                            <torusGeometry args={[Math.sqrt(12 * 12 - Math.pow((i - 2) * 2.5, 2)), 0.015, 16, 150]} />
                            <meshBasicMaterial color="#a855f7" transparent opacity={0.12} />
                        </mesh>
                    ))}
                </group>

                <Sphere args={[6, 32, 32]}>
                    <MeshDistortMaterial
                        color="#9333ea"
                        speed={0.5}
                        distort={0.1}
                        radius={1}
                        opacity={0.05}
                        transparent
                    />
                </Sphere>
            </Float>
        </group>
    );
}

export function Wireframe3D() {
    const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

    useEffect(() => {
        setEventSource(document.body);
    }, []);

    return (
        <div className="w-full h-full relative">
            <Canvas
                camera={{ position: [0, 0, 18], fov: 45 }}
                eventSource={eventSource}
                eventPrefix="client"
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[20, 20, 20]} intensity={1} color="#a855f7" />
                <pointLight position={[-20, -20, -20]} intensity={0.5} color="#6366f1" />

                <group position={[0, -2, 0]}>
                    <Shape />
                </group>

                <Particles count={40} />
            </Canvas>
        </div>
    );
}

function Particles({ count }: { count: number }) {
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.x += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#a855f7"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}
