/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// ─── Floating Cube ──────────────────────────────────────────────────
function FloatingCube({ position, size = 0.18, color = '#A855F7', speed = 1, floatIntensity = 0.4, rotationSpeed = 0.5 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * rotationSpeed
      ref.current.rotation.y += dt * rotationSpeed * 0.7
    }
  })
  return (
    <Float speed={speed} floatIntensity={floatIntensity} rotationIntensity={0.3}>
      <RoundedBox ref={ref} args={[size, size, size]} radius={size * 0.15} position={position}>
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </RoundedBox>
    </Float>
  )
}

// ─── Gear Shape ──────────────────────────────────────────────────
function GearShape({ position, scale = 1, color = '#E879F9' }) {
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const teeth = 8
    const outerR = 0.18 * scale
    const innerR = 0.12 * scale
    const toothH = 0.04 * scale
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2
      const a2 = ((i + 0.3) / teeth) * Math.PI * 2
      const a3 = ((i + 0.5) / teeth) * Math.PI * 2
      const a4 = ((i + 0.8) / teeth) * Math.PI * 2
      const r1 = innerR
      const r2 = outerR + toothH
      if (i === 0) shape.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1)
      else shape.lineTo(Math.cos(a1) * r1, Math.sin(a1) * r1)
      shape.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2)
      shape.lineTo(Math.cos(a3) * r2, Math.sin(a3) * r2)
      shape.lineTo(Math.cos(a4) * r1, Math.sin(a4) * r1)
    }
    shape.closePath()
    // Hole in center
    const hole = new THREE.Path()
    hole.absellipse(0, 0, 0.05 * scale, 0.05 * scale, 0, Math.PI * 2, false)
    shape.holes.push(hole)
    const extrudeSettings = { depth: 0.03 * scale, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 2 }
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [scale])

  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.3
  })

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={ref} geometry={geo} position={position}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </Float>
  )
}

// ─── Laptop Base ──────────────────────────────────────────────────
function LaptopBase() {
  return (
    <group position={[0, 0.02, 0]}>
      {/* Base/keyboard */}
      <RoundedBox args={[1.6, 0.06, 1.0]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2D1B69" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Keyboard surface */}
      <RoundedBox args={[1.3, 0.005, 0.7]} radius={0.02} position={[0, 0.035, 0.05]}>
        <meshStandardMaterial color="#1a103d" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* Trackpad */}
      <RoundedBox args={[0.35, 0.005, 0.22]} radius={0.02} position={[0, 0.035, 0.3]}>
        <meshStandardMaterial color="#251466" metalness={0.6} roughness={0.3} />
      </RoundedBox>
    </group>
  )
}

// ─── Laptop Screen ──────────────────────────────────────────────────
function LaptopScreen() {
  return (
    <group position={[0, 0.55, -0.45]} rotation={[0.25, 0, 0]}>
      {/* Screen frame */}
      <RoundedBox args={[1.5, 1.0, 0.04]} radius={0.02}>
        <meshStandardMaterial color="#2D1B69" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Screen display */}
      <RoundedBox args={[1.35, 0.85, 0.005]} radius={0.01} position={[0, 0, 0.025]}>
        <meshStandardMaterial color="#0F0A2E" metalness={0.3} roughness={0.5} emissive="#1a0a4e" emissiveIntensity={0.5} />
      </RoundedBox>
      {/* Screen content - profile avatar circle */}
      <mesh position={[-0.25, 0.18, 0.03]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.3} />
      </mesh>
      {/* Screen content - code lines */}
      {[0.08, -0.02, -0.12, -0.22].map((y, i) => (
        <RoundedBox key={i} args={[0.5 - i * 0.08, 0.04, 0.003]} radius={0.005} position={[0.15, y, 0.03]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? '#A855F7' : '#00F0FF'}
            emissive={i % 2 === 0 ? '#A855F7' : '#00F0FF'}
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
          />
        </RoundedBox>
      ))}
      {/* Screen content - pie chart */}
      <mesh position={[-0.25, -0.15, 0.03]}>
        <ringGeometry args={[0.06, 0.1, 32, 1, 0, Math.PI * 1.4]} />
        <meshStandardMaterial color="#E879F9" emissive="#E879F9" emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.25, -0.15, 0.03]}>
        <ringGeometry args={[0.06, 0.1, 32, 1, Math.PI * 1.4, Math.PI * 0.6]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Platform ──────────────────────────────────────────────────────
function Platform() {
  return (
    <RoundedBox args={[2.8, 0.08, 1.8]} radius={0.04} position={[0, -0.1, 0.1]}>
      <meshStandardMaterial
        color="#D946EF"
        metalness={0.4}
        roughness={0.3}
        emissive="#9333EA"
        emissiveIntensity={0.2}
      />
    </RoundedBox>
  )
}

// ─── Cloud Icon ──────────────────────────────────────────────────
function CloudIcon({ position }) {
  return (
    <Float speed={2} floatIntensity={0.5}>
      <group position={position}>
        {/* Cloud body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#7C3AED" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.08, -0.02, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#7C3AED" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[-0.08, -0.02, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#7C3AED" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Connection dots below cloud */}
        {[0, -0.08, -0.16].map((y, i) => (
          <mesh key={i} position={[0, y - 0.12, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// ─── Envelope / Mail Icon ──────────────────────────────────────────
function EnvelopeIcon({ position }) {
  return (
    <Float speed={1.8} floatIntensity={0.6}>
      <group position={position}>
        <RoundedBox args={[0.18, 0.12, 0.02]} radius={0.01}>
          <meshStandardMaterial color="#06B6D4" metalness={0.5} roughness={0.3} emissive="#06B6D4" emissiveIntensity={0.2} />
        </RoundedBox>
        {/* Flap */}
        <mesh position={[0, 0.03, 0.012]} rotation={[0.4, 0, 0]}>
          <planeGeometry args={[0.16, 0.08]} />
          <meshStandardMaterial color="#0891B2" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

// ─── Percentage Badge ──────────────────────────────────────────────
function PercentBadge({ position, color = '#A855F7' }) {
  return (
    <Float speed={1.2} floatIntensity={0.3}>
      <group position={position}>
        <RoundedBox args={[0.22, 0.1, 0.02]} radius={0.02}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} emissive={color} emissiveIntensity={0.3} />
        </RoundedBox>
      </group>
    </Float>
  )
}

// ─── Glass Orb ──────────────────────────────────────────────────
function GlassOrb({ position, color = '#00F0FF', size = 0.08 }) {
  return (
    <Float speed={2.5} floatIntensity={0.4}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  )
}

// ─── Auto-rotate container ──────────────────────────────────────────
function RotatingGroup({ children }) {
  const group = useRef()
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12
    }
  })
  return <group ref={group}>{children}</group>
}

// ─── Main Scene ──────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow color="#ffffff" />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#A855F7" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#00F0FF" />

      <RotatingGroup>
        {/* Platform */}
        <Platform />

        {/* Laptop */}
        <group position={[0, 0.12, 0.1]}>
          <LaptopBase />
          <LaptopScreen />
        </group>

        {/* Floating Cubes */}
        <FloatingCube position={[1.2, 0.4, 0.3]} size={0.15} color="#7C3AED" speed={1.5} />
        <FloatingCube position={[1.0, 0.15, 0.6]} size={0.1} color="#4F46E5" speed={1.2} />
        <FloatingCube position={[-1.1, 0.1, 0.5]} size={0.12} color="#06B6D4" speed={1.8} />
        <FloatingCube position={[0.8, 0.7, -0.2]} size={0.08} color="#A855F7" speed={2.0} />
        <FloatingCube position={[-0.9, 0.6, -0.1]} size={0.1} color="#E879F9" speed={1.3} />

        {/* Gears */}
        <GearShape position={[0.85, -0.02, 0.7]} scale={1.2} color="#E879F9" />
        <GearShape position={[0.65, -0.02, 0.85]} scale={0.8} color="#818CF8" />

        {/* Cloud */}
        <CloudIcon position={[-1.0, 0.8, 0.0]} />

        {/* Envelope */}
        <EnvelopeIcon position={[0.3, 1.1, -0.3]} />

        {/* Percentage Badges */}
        <PercentBadge position={[1.1, 0.7, 0.0]} color="#7C3AED" />
        <PercentBadge position={[-0.5, -0.02, 0.85]} color="#4F46E5" />

        {/* Glass Orbs */}
        <GlassOrb position={[-1.2, 0.3, 0.4]} color="#06B6D4" size={0.06} />
        <GlassOrb position={[0.6, 0.1, 0.8]} color="#A855F7" size={0.05} />

        {/* Code bracket icon */}
        <Float speed={1.5} floatIntensity={0.4}>
          <group position={[-0.7, -0.02, 0.8]}>
            <RoundedBox args={[0.14, 0.14, 0.03]} radius={0.02}>
              <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.3} emissive="#4F46E5" emissiveIntensity={0.3} />
            </RoundedBox>
          </group>
        </Float>

        {/* Small floating dots / particles */}
        {[
          [1.3, 0.9, 0.1],
          [-1.3, 0.5, 0.3],
          [0.0, 1.2, 0.0],
          [-0.5, 0.9, 0.4],
          [0.7, 0.9, 0.5],
        ].map((pos, i) => (
          <Float key={i} speed={3} floatIntensity={0.6}>
            <mesh position={pos}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial
                color="#00F0FF"
                emissive="#00F0FF"
                emissiveIntensity={0.8}
              />
            </mesh>
          </Float>
        ))}
      </RotatingGroup>

      <ContactShadows position={[0, -0.18, 0.1]} opacity={0.4} scale={4} blur={2.5} />
    </>
  )
}

// ─── Exported Component ──────────────────────────────────────────
export default function LaptopScene() {
  return (
    <Canvas
      camera={{ position: [2.5, 2.0, 2.5], fov: 35, near: 0.1, far: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}
    >
      <Scene />
    </Canvas>
  )
}
