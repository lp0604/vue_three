<template>
  <div>
    <div id='container'></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';
import loadImg from "@/assets/icons/logo.png"
//导入dat.gui
import * as dat from 'dat.gui';
export default {
  name: 'HomeView',
  components: {},
  mounted() {
    this.$nextTick(()=> {
      this.init();
    })
    
  },
  methods: {
    init() {
      //创建场景
      const scene = new THREE.Scene();
      let container = document.getElementById('container');
      console.log(container)
      //创建相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // 设置相机位置
      camera.position.set(0, 0, 10);
      scene.add(camera);

      //导入纹理
      const textureLoader = new THREE.TextureLoader();
      const doorColorTexture = textureLoader.load(loadImg);

      // 设置旋转的原点
      // doorColorTexture.center.set(0.5, 0.5);
      // 旋转45deg
      // doorColorTexture.rotation = Math.PI / 4;
      //设置纹理的重复
      doorColorTexture.repeat.set(2, 3);
      //设置纹理重复的模式
      doorColorTexture.wrapS = THREE.MirroredRepeatWrapping; 
      doorColorTexture.wrapT = THREE.RepeatWrapping;

      // 添加物体
      const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
      //材质
      const basicMaterial = new THREE.MeshBasicMaterial({
        color: '#ffff00',
        map:doorColorTexture,
      });
      const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
      scene.add(cube);
      

      // 初始化渲染器
      const renderer = new THREE.WebGL1Renderer();
      // 设置渲染器的尺寸大小
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 将webgl渲染到canvas内容添加到body
      container.appendChild(renderer.domElement);

      // 使用渲染器。通过相机将场景渲染进来
      // renderer.render(scene, camera);

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      // 设置控制器阻尼，让控制器更有真实效果
      controls.enableDamping = true;

      // 添加坐标轴辅助器
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      const render = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      render();

      // 监听画面变化，更新渲染画面
      window.addEventListener('resize', () => {
        // 更新摄像头
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // 更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight);
        // 设置渲染器的像素化
        renderer.setPixelRatio(window.devicePixelRatio);
      })
    }
  }
}
</script>
