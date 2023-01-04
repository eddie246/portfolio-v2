import {
  ContactShadows,
  Environment,
  Gltf,
  Line,
  OrbitControls,
  Segment,
  SegmentObject,
  Segments,
  Shadow,
  useGLTF,
} from '@react-three/drei';
import {
  Bloom,
  EffectComposer,
  SelectiveBloom,
} from '@react-three/postprocessing';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';

export default function Experience() {
  console.log('Render');

  const { nodes, materials } = useGLTF('./line.glb');

  console.log(nodes, materials);

  return (
    <>
      <Perf position='top-left' />
      <color attach={'background'} args={['#111']} />
      {/* <Gltf src='./main.glb' /> */}
      <EffectComposer>
        <Bloom
          mipmapBlur
          // luminanceThreshold={0.5}
          luminanceSmoothing={0}
          intensity={1}
        />
      </EffectComposer>

      <OrbitControls makeDefault />

      {/* <ambientLight intensity={1} /> */}
      {/* <Environment background blur={0.5} files='night.hdr' /> */}
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[20, 50, 20]}
        castShadow
      />

      <Line
        // ref={(obj) => {
        //   obj && (obj.material.toneMapped = false);
        // }}
        toneMapped={false}
        needsUpdate
        lineWidth={1}
        color={[1, 1, 1]}
        points={[...nodes.BezierCurve.geometry.attributes.position.array]}
        vertexColors={[
          [0, 0, 0],
          [2, 0, 0],
          [1, 10, 0],
          [1, 10, 0],
          [1, 10, 0],
          [1, 1, 0],
          [1, 1, 0],
          [1, 1, 0],
          [1, 1, 0],
          [1, 1, 0],
          [1, 1, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [1, 1, 0],
          [1, 1, 0],
          [1, 1, 0],
          [0, 0, 20],
          [0, 0, 20],
          [0, 0, 20],
        ]}
      />

      {/*<line geometry={nodes.BezierCurve.geometry}>
        <lineBasicMaterial
          ref={(obj) => console.log(obj)}
          color={[10, 10, 10]}
          linewidth={10}
          needsUpdate={true}
          toneMapped={false}
          vertexColors={[
            [0, 0, 0],
            [0, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
          ]}
        />
        </line> */}

      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial
          emissive={'red'}
          // emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh> */}

      {/* <Suspense
        fallback={
          <mesh>
            <boxBufferGeometry />
            <meshBasicMaterial color={'red'} wireframe />
          </mesh>
        }
      >
        <primitive object={model.scene} receiveShadow castShadow />
      </Suspense> */}

      <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial envMapIntensity={0.2} />
      </mesh>
    </>
  );
}
