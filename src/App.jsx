import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, OrbitControls, Center, Stars, Sparkles, Environment, Billboard } from '@react-three/drei'
import * as THREE from 'three'

// --- DATA ---
const DATA = {
  T: {
    // Location
    items: [
      { label: 'BELFAST', sub: 'Northern Ireland', url: null }
    ]
  },
  A: {
    // Interests
    items: [
      { label: 'DOTA 2', url: 'https://dota2ireland.com/' },
      { label: 'TATTOOS', url: null },
      { label: 'GUINNESS', url: null }
    ]
  },
  Y: {
    // Current - Updated
    title: 'CURRENT',
    items: [
      { label: 'BUILDING', sub: 'internet stuff', url: 'https://github.com/taylorferran' }
    ]
  },
  L: {
    // Past - Updated
    title: 'PAST WORK',
    items: [
      { label: 'SSV.NETWORK', sub: 'Developer Relations', url: 'https://ssv.network/' },
      { label: 'ETHERSPOT', sub: 'Developer Relations', url: 'https://etherspot.io' },
      { label: 'METAINTRO', sub: 'Technical Content', url: 'https://www.metaintro.com/' },
      { label: 'ENEA', sub: 'Sr. Software Engineer', url: 'https://owmobility.com/' }
    ]
  },
  O: {
    // Socials
    title: 'SOCIALS',
    items: [
      { label: 'TWITTER', url: 'https://twitter.com/taylorferran' },
      { label: 'GITHUB', url: 'https://github.com/taylorferran' },
      { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/taylorferran/' }
    ]
  },
  R: {
    // Gaming / Other
    title: 'LINKS',
    items: [
      { label: 'STEAM', url: 'https://steamcommunity.com/id/taylorferran' },
      { label: 'TWITCH', url: 'https://twitch.tv/taylor_dota' },
      { label: 'TELEGRAM', url: 'https://t.me/taylorferran' },
      { label: 'DISCORD', url: 'https://discordapp.com/users/147012760394268672' }
    ]
  }
}

// --- COMPONENTS ---

function EditorialOverlay({ data, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 500)
  }

  if (!data) return null

  return (
    <div className={`editorial-overlay ${visible ? 'visible' : ''}`} onClick={handleClose}>
      <div className="editorial-content">
        {data.title && (
          <div className="editorial-header" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: '0.5s ease-out' }}>
            <h2 className="editorial-title">{data.title}</h2>
          </div>
        )}

        {data.items.map((item, i) => (
          <div key={i} className="editorial-row" style={{ transitionDelay: `${i * 0.1}s` }}>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="editorial-link">
                {item.label}
                {item.sub && <span className="editorial-sub">{item.sub}</span>}
                <span className="editorial-arrow">↗</span>
              </a>
            ) : (
              <span className="editorial-text">
                {item.label}
                {item.sub && <span className="editorial-sub">{item.sub}</span>}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="editorial-backdrop" />
    </div>
  )
}


function Letter({ char, position, onLetterClick }) {
  const groupRef = useRef()
  const materialRef = useRef()
  const [hovered, setHover] = useState(false)

  // Random params for "breathing"
  const seed = useMemo(() => Math.random() * 1000, [])
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, [])
  const glowSpeed = useMemo(() => 0.3 + Math.random() * 0.2, [])
  const glowPhase = useMemo(() => Math.random() * Math.PI * 2, [])

  const initialVec = useMemo(() => new THREE.Vector3(...position), [position[0], position[1], position[2]])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const wobbleAmt = 0.2

    const noiseX = Math.sin(t * speed + seed) * wobbleAmt
    const noiseY = Math.cos(t * speed * 0.9 + seed + 23) * wobbleAmt
    const noiseZ = Math.sin(t * speed * 0.7 + seed + 45) * wobbleAmt * 0.5

    const targetPos = initialVec.clone().add(new THREE.Vector3(noiseX, noiseY, noiseZ))
    groupRef.current.position.lerp(targetPos, 0.1)

    // Gentle rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(t * 0.3 + seed) * 0.05, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.cos(t * 0.4 + seed) * 0.05, 0.05)

    // Subtle pulsing glow effect
    if (materialRef.current && !hovered) {
      const glowIntensity = 0.15 + Math.sin(t * glowSpeed + glowPhase) * 0.1
      materialRef.current.emissiveIntensity = glowIntensity
    }
  })

  useEffect(() => {
    return () => { document.body.style.cursor = 'auto' }
  }, [])

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation()
        onLetterClick(char)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        setHover(false)
        document.body.style.cursor = 'auto'
      }}
    >


      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.2}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {char}
            <meshStandardMaterial
              ref={materialRef}
              color={hovered ? "#ff5555" : "#e0e0e0"}
              emissive={hovered ? "#550000" : "#333333"}
              emissiveIntensity={hovered ? 0.6 : 0.15}
              metalness={0.6}
              roughness={0.2}
            />
          </Text3D>
        </Center>
      </Billboard>
    </group>
  )
}



function Scene({ onLetterClick }) {
  const { viewport } = useThree()
  const text = 'TAYLOR'
  const letters = text.split('')

  const isPortrait = viewport.height > viewport.width
  const spacing = 1.8
  const scale = isPortrait ? 0.6 : 1

  return (
    <>
      {/* TEXT */}
      <group position={[0, 0, 0]} scale={scale}>
        {letters.map((letter, i) => {
          let x, y, z = 0

          if (isPortrait) {
            x = 0
            y = ((letters.length - 1) / 2 - i) * spacing
          } else {
            x = (i - (letters.length - 1) / 2) * spacing
            y = 0
          }

          return (
            <Letter
              key={i}
              char={letter}
              position={[x, y, z]}
              onLetterClick={onLetterClick}
            />
          )
        })}
      </group>

      {/* LIGHTS */}
      <ambientLight intensity={2} color="#888899" />
      <spotLight
        position={isPortrait ? [0, 0, 25] : [0, 10, 20]}
        intensity={isPortrait ? 80 : 40}
        color="#ffffff"
        angle={1.2}
      />
      <pointLight position={[0, -5, 2]} intensity={20} color="#8a0303" distance={20} />
      {isPortrait && <pointLight position={[0, 0, 15]} intensity={40} color="#ffffff" distance={30} />}
    </>
  )
}

export default function App() {
  const [activeData, setActiveData] = useState(null)

  const handleLetterClick = (letter) => {
    if (DATA[letter]) {
      setActiveData({ ...DATA[letter], id: Math.random() })
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />

        {/* Lighting is now handled inside Scene for better containment */}

        <Scene onLetterClick={handleLetterClick} />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* Interaction Layer */}
      {activeData && (
        <EditorialOverlay
          key={activeData.id}
          data={activeData}
          onClose={() => setActiveData(null)}
        />
      )}
    </div>
  )
}
