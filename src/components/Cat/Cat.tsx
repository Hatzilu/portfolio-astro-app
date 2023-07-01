import { createRoot } from 'react-dom/client';
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import {
	AnimationMixer,
	AxesHelper,
	type BufferGeometry,
	type Material,
	type Mesh,
	type NormalBufferAttributes,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei/core';

const Cat = ({ props }: any) => {
	const [active, setActive] = useState(false);

	const toggleActive = () => setActive((a) => !a);

	return (
		<Canvas onClick={toggleActive} camera={{ fov: 10, position: [6, 2.5, 12] }}>
			<Suspense fallback={null}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Box active={active} position={[0, 0, 0]} />
			</Suspense>
		</Canvas>
	);
};

function Box(props: ThreeElements['mesh'] & { active: boolean }) {
	const model = useLoader(GLTFLoader, 'src/assets/cat2.glb');
	// const meshRef = useRef<THREE.Mesh>(null!);
	const [hovered, setHover] = useState(false);

	const mixer = new AnimationMixer(model.scene);
	if (model.animations.length && props.active) {
		model.animations.forEach((clip) => {
			const action = mixer.clipAction(clip);
			action.play();
		});
	}
	console.log(props.active);

	useFrame((state, delta) => {
		console.log(mixer.time);
		if (props.active === false) {
			// model.animations.forEach((clip) => {
			// 	const action = mixer.clipAction(clip);
			// 	action.reset();
			// });
			mixer?.setTime(0);
		}
		mixer?.update(delta);
	});
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
			<OrbitControls />
			<primitive object={model.scene} scale={1} position={props.position} />
		</>
	);
}

export default Cat;
