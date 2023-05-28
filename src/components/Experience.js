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
  SoftShadows,
  useGLTF,
} from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  SelectiveBloom,
  N8AO,
  SMAA,
  FXAA,
} from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import { useControls } from "leva";

export default function Experience() {
  console.log("Render");
  console.log("hello ");

  const { nodes, materials } = useGLTF("./line.glb");

  const N8AOConfig = useControls({
    intensity: { value: 3.5, min: 0, max: 20 },
    color: "#27192a",
    aoRadius: { value: 3.9, min: 0, max: 10 },
    aoSamples: { value: 12, min: 1, max: 64, step: 1 },
    denoiseSamples: { value: 5, min: 1, max: 12, step: 1 },
    denoiseRadius: { value: 12, min: 1, max: 12, step: 1 },
    distanceFalloff: { value: 2.2, min: 0, max: 10 },
  });

  return (
    <>
      <Perf position="top-left" />
      <color attach={"background"} args={["#111"]} />
      {/* <fog attach="fog" args={["#17171b", 30, 140]} /> */}
      <Gltf receiveShadow castShadow src="./main.glb" />
      {/* <Gltf receiveShadow castShadow src="./main.glb" position={[0, 0, 10]} />
      <Gltf receiveShadow castShadow src="./main.glb" position={[0, 0, 20]} />
      <Gltf receiveShadow castShadow src="./main.glb" position={[0, 0, -10]} />
      <Gltf receiveShadow castShadow src="./main.glb" position={[0, 0, -20]} /> */}

      <SoftShadows size={20} />

      <OrbitControls makeDefault />

      {/* <ambientLight intensity={1} /> */}
      <Environment
        background
        // blur={0.5}
        // files="night.hdr"
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/satara_night_no_lamps_1k.hdr"
      />

      <directionalLight position={[20, 25, 10]} intensity={0.05} castShadow>
        <orthographicCamera
          attach="shadow-camera"
          args={[-20, 20, 20, -10, 1, 100]}
        />
      </directionalLight>
      {/* <spotLight
        intensity={0.1}
        angle={0.1}
        penumbra={1}
        position={[20, 60, 20]}
        castShadow
      /> */}

      <Line
        // ref={(obj) => {
        //   obj && (obj.material.toneMapped = false);
        // }}

        position={[5, 2, 0]}
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
        <meshStandardMaterial envMapIntensity={1} />
      </mesh>

      {/* <EffectComposer disableNormalPass multisampling={0}>
        <N8AO {...N8AOConfig} />
      </EffectComposer> */}

      <EffectComposer>
        <N8AO {...N8AOConfig} />

        <Bloom
          mipmapBlur
          luminanceThreshold={0.5}
          luminanceSmoothing={0}
          intensity={2}
        />
        <SMAA />
        {/* <FXAA /> */}
      </EffectComposer>
    </>
  );
}
