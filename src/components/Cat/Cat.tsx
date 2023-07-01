import { createRoot } from 'react-dom/client';
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import type { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Cat = ({ props }: any) => {
	return (
		<Canvas camera={{ fov: 70, position: [0, 0, 6] }}>
			<Suspense fallback={null}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Box position={[-0.2, -4.5, 4]} />
			</Suspense>
		</Canvas>
	);
};

function Box(props: ThreeElements['mesh']) {
	const gltf = useLoader(GLTFLoader, 'src/assets/cat.glb');
	// const meshRef = useRef<THREE.Mesh>(null!);
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// useFrame((state, delta) => (meshRef.current.rotation.y += delta));
	return (
		// <mesh
		// 	{...props}
		// 	ref={meshRef}
		// 	scale={active ? 1.5 : 1}
		// 	onClick={(event) => setActive(!active)}
		// 	onPointerOver={(event) => setHover(true)}
		// 	onPointerOut={(event) => setHover(false)}
		// >
		// 	<boxGeometry args={[1, 1, 1]} />
		// 	<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		// </mesh>
		<>
			<primitive object={gltf.scene} scale={1} position={props.position} />
		</>
	);
}

export default Cat;
