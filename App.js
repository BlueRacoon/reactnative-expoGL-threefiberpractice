// import { GLView } from "expo-gl";
// import { Renderer, TextureLoader } from "expo-three";
// import { useEffect } from "react";
// import {
//   AmbientLight,
//   BoxBufferGeometry,
//   Fog,
//   GridHelper,
//   Mesh,
//   MeshStandardMaterial,
//   PerspectiveCamera,
//   PointLight,
//   Scene,
//   SpotLight,
// } from "three";

// export default function App() {
//   let timeout;

//   useEffect(() => {
//     // Clear the animation loop when the component unmounts
//     return () => clearTimeout(timeout);
//   }, []);

//   const onContextCreate = async (gl) => {
//     const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
//     const sceneColor = 0x6ad6f0;

//     // Create a WebGLRenderer without a DOM element
//     const renderer = new Renderer({ gl });
//     renderer.setSize(width, height);
//     renderer.setClearColor(sceneColor);

//     const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
//     camera.position.set(2, 5, 5);

//     const scene = new Scene();
//     scene.fog = new Fog(sceneColor, 1, 10000);
//     scene.add(new GridHelper(10, 10));

//     const ambientLight = new AmbientLight(0x101010);
//     scene.add(ambientLight);

//     const pointLight = new PointLight(0xffffff, 2, 1000, 1);
//     pointLight.position.set(0, 200, 200);
//     scene.add(pointLight);

//     const spotLight = new SpotLight(0xffffff, 0.5);
//     spotLight.position.set(0, 500, 100);
//     spotLight.lookAt(scene.position);
//     scene.add(spotLight);

//     const cube = new IconMesh();
//     scene.add(cube);

//     camera.lookAt(cube.position);

//     function update() {
//       cube.rotation.y += 0.05;
//       cube.rotation.x += 0.025;
//     }

//     // Setup an animation loop
//     const render = () => {
//       timeout = requestAnimationFrame(render);
//       update();
//       renderer.render(scene, camera);
//       gl.endFrameEXP();
//     };
//     render();
//   };

//   return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
// }

// class IconMesh extends Mesh {
//   constructor() {
//     super(
//       new BoxBufferGeometry(1.0, 1.0, 1.0),
//       new MeshStandardMaterial({
//         map: new TextureLoader().load(require("./icon.jpg")),
//       })
//     );
//   }
// }

import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import { useEffect } from "react";
// import OrbitControlsView from "expo-three-orbit-controls";
import {
  AmbientLight,
  BoxBufferGeometry,
  cubeOneGeometry,
  cubeOneBufferGeometry,
  CylinderBufferGeometry,
  SphereBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Group,
  OBJLoader,
} from "three";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import * as FileSystem from "expo-file-system";
// import { asset } from "expo-asset";
// import { GLBLoader } from "expo-three-gltf-loader";
// import { GLTF2 } from 'three';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { GLTF2 } from "three/examples/jsm/loaders/GLTF2 ";
import { Asset } from "expo-asset";
import * as THREE from "three";
// import { useGLTF } from "@react-three/drei";

// console.log(useGLTF);

// const loader = new GLTFLoader();

// loader.load(
//   "./assets/iphone.glb",
//   (gltf) => {
//     const model = gltf.scene;
//     console.log(model);
//     // Add the model to the scene or do something with it
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );

// console.log("GLTFLoader: ", GLTFLoader);
// console.log("Asset: ", Asset);

// const asset = Asset.fromModule("./assets/iphone.glb");

// console.log("asset", asset);
// console.log("loader", loader);

// const onLoad = (gltf) => {
//   // Do something with the loaded gltf object
//   console.log(gltf);
// };

// const onError = (error) => {
//   console.error(error);
// };

// loader.load(asset.uri, onLoad, null, onError);

export default function App() {
  let timeout;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    // camera.position.set(2, 1, 1);

    let gridX = 100;
    let gridY = 100;

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 50);
    scene.add(new GridHelper(gridX, gridY));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    // const obj = useLoader(
    //   OBJLoader,
    //   "./assets/uploads_files_2864929_spacecraft.obj"
    // );

    // const cubeOne = new SquareMesh();
    // const cubeTwo = new SquareMesh();
    // const cubeThree = new SquareMesh();
    // const cubeFour = new SquareMesh();
    // const cubeFive = new SquareMesh();
    // const cubeSix = new SquareMesh();
    // const cubeSeven = new SquareMesh();
    // const cubeEight = new SquareMesh();
    // const cubeNine = new SquareMesh();

    const mainBody = new mainBodyMesh();
    mainBody.position.set(0, 0, 0);

    const cockPit = new cockpitMesh();
    cockPit.position.set(0, 0, 2);

    const leftWing = new wingMesh();
    leftWing.rotation.z = Math.PI / 2;
    leftWing.position.set(-1.5, 0, 0);

    const rightWing = new wingMesh();
    rightWing.rotation.z = Math.PI / 2;
    rightWing.position.set(1.5, 0, 0);

    // const leftEngine = new engineMesh();
    // leftEngine.rotation.z = Math.PI / 2;
    // leftEngine.position.set(-2, 0, -3);

    // const rightEngine = new engineMesh();
    // rightEngine.rotation.z = Math.PI / 2;
    // rightEngine.position.set(2, 0, -3);

    const leftWeapon = new weaponMesh();
    leftWeapon.rotation.z = Math.PI / 2;
    leftWeapon.position.set(-1.5, 0, -2);

    const rightWeapon = new weaponMesh();
    rightWeapon.rotation.z = Math.PI / 2;
    rightWeapon.position.set(1.5, 0, -2);

    // //place cube two
    // cubeTwo.position.x = 1;
    // cubeTwo.position.y = cubeOne.position.y;
    // cubeTwo.position.z = cubeOne.position.z;

    // //place cube three
    // cubeThree.position.x = -1;
    // cubeThree.position.y = cubeOne.position.y;
    // cubeThree.position.z = cubeOne.position.z;

    // //place cube four
    // cubeFour.position.x = 2;
    // cubeFour.position.y = cubeOne.position.y;
    // cubeFour.position.z = cubeOne.position.z;

    // //place cube five
    // cubeFive.position.x = -2;
    // cubeFive.position.y = cubeOne.position.y;
    // cubeFive.position.z = cubeOne.position.z;
    // //place cube six
    // cubeSix.position.x = 2;
    // cubeSix.position.y = cubeOne.position.y;
    // cubeSix.position.z = cubeOne.position.z + 1;
    // //place cube Seven
    // cubeSeven.position.x = -2;
    // cubeSeven.position.y = cubeOne.position.y;
    // cubeSeven.position.z = cubeOne.position.z + 1;
    // //place cube eight
    // cubeEight.position.x = 2;
    // cubeEight.position.y = cubeOne.position.y;
    // cubeEight.position.z = cubeOne.position.z + 2;
    // //place cube nine
    // cubeNine.position.x = -2;
    // cubeNine.position.y = cubeOne.position.y;
    // cubeNine.position.z = cubeOne.position.z + 2;

    let shipGroup = new Group();

    // shipGroup.add(
    //   cubeOne,
    //   cubeTwo,
    //   cubeThree,
    //   cubeFour,
    //   cubeFive,
    //   cubeSix,
    //   cubeSeven,
    //   cubeEight,
    //   cubeNine
    // );
    shipGroup.add(
      mainBody,
      cockPit,
      leftWing,
      rightWing,
      // leftEngine,
      // rightEngine,
      leftWeapon,
      rightWeapon
    );

    // scene.add(cubeOne);
    // scene.add(cubeTwo);
    scene.add(shipGroup);

    function updateCamera(delta) {
      camera.position.set(
        // make this x part 0 to not spin
        shipGroup.position.x,
        shipGroup.position.y + 5,
        shipGroup.position.z + 20
      );
      // camera.lookAt(shipGroup.position);
    }

    function updateShip(delta) {
      shipGroup.rotation.y = delta;
      // shipGroup.rotation.y = delta;
    }

    camera.position.set(
      shipGroup.position.x,
      shipGroup.position.y + 7,
      shipGroup.position.z + 25
    );

    camera.lookAt(shipGroup.position);

    //set interval to false to initiate add grid @ 5
    let addedGrid = false;

    clock = new THREE.Clock();

    let time = clock.getElapsedTime();

    function update() {
      let elapsedTime = clock.getElapsedTime();

      let diff = elapsedTime - time;
      // console.log("diff", diff);

      updateShip(diff);
      // updateCamera(diff);

      if (
        parseFloat(((shipGroup.position.z % 50) * -1).toFixed(0)) === 25 &&
        addedGrid === false
      ) {
        // console.log(
        //   "trigs 11111111111111111111111111111111111111111111111111111111111"
        // );
        gridX = gridX + 100;
        gridY = gridY + 100;
        scene.add(new GridHelper(gridX, gridY));
        addedGrid = true;
      }
      if (
        parseFloat(((shipGroup.position.z % 50) * -1).toFixed(0)) === 26 &&
        addedGrid === true
      ) {
        // console.log("trigs 2222222222222222222222222222222222222222222");
        addedGrid = false;
      }
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}

class SquareMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1, 1, 1),
      new MeshStandardMaterial({
        // map: new TextureLoader().load(require("./icon.jpg")),
        color: "black",
      })
    );
  }
}

class mainBodyMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(1, 2, 4, 32),
      new MeshPhysicalMaterial({
        color: "gray",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
      })
    );
  }
}

class cockpitWindowMesh extends Mesh {
  constructor() {
    super(
      new CircleBufferGeometry(0.3, 32),
      new MeshPhysicalMaterial({
        color: "black",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
        transparent: true,
        opacity: 0.5,
      })
    );
  }
}

class cockpitMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(0.5, 0.5, 1, 32),
      new MeshPhysicalMaterial({
        color: "black",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
      })
    );
  }
}

class cockpitDetailsMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(0.4, 0.4, 0.1, 32),
      new MeshPhysicalMaterial({
        color: "gray",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
      })
    );
  }
}

class mainBodyDetailsMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(1.5, 1.5, 0.2, 32),
      new MeshPhysicalMaterial({
        color: "gray",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
      })
    );
  }
}
class wingMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(0.1, 1, 2, 32),
      new MeshPhysicalMaterial({
        color: "gray",
        roughness: 0.5,
        metalness: 0.5,
        reflectivity: 0.5,
      })
    );
  }
}

class engineMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(0.5, 0.5, 4, 32),
      new MeshPhysicalMaterial({
        // map: new TextureLoader().load(require("./icon.jpg")),
        color: "red",
        roughness: 0.5,
        metalness: 1,
        reflectivity: 0.5,
      })
    );
  }
}

class weaponMesh extends Mesh {
  constructor() {
    super(
      new CylinderBufferGeometry(0.5, 0.5, 2, 32),
      new MeshPhysicalMaterial({
        color: "blue",
        roughness: 0.5,
        metalness: 1,
        reflectivity: 0.5,
      })
    );
  }
}
