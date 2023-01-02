import {
  ContactShadows,
  Environment,
  Gltf,
  OrbitControls,
  Shadow,
  useGLTF,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';

export default function Experience() {
  console.log('Render');

  const { nodes, materials } = useGLTF('./main.glb');

  console.log(nodes, materials);

  return (
    <>
      <Perf position='top-left' />
      <color attach={'background'} args={['#111']} />

      <OrbitControls makeDefault />

      {/* <ambientLight intensity={10} /> */}
      <Environment background blur={0.5} files='night.hdr' />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[20, 50, 20]}
        castShadow
      />

      <Suspense
        fallback={
          <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial color={'red'} wireframe />
          </mesh>
        }
      >
        {/* <Gltf src='./Cyber.glb' /> */}
        {/* <primitive object={model.scene} receiveShadow castShadow /> */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['1stFloot'].geometry}
          material={materials['']}
          material-envMapIntensity={0.2}
        />
      </Suspense>

      <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial envMapIntensity={0.2} />
      </mesh>
    </>
  );
}
