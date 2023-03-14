<template>
  <div>
    <div id='container'></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';
//导入dat.gui
import * as dat from 'dat.gui';
export default {
  name: 'HomeView',
  components: {},
  created() {
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

      // 添加物体
      // 创建几何体
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
      // 根据几何体贺材质创建物体
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.rotation.set(Math.PI / 4, 0, 0);
      // 将几何体添加到场景中
      scene.add(cube);

      const gui = new dat.GUI();

      //移动
      gui
       .add(cube.position,'x')
       .min(0)
       .max(5)
       .step(0.01)
       .name('移动x轴')
       .onChange((value) => {})
       .onFinishChange((value) => {});

      // 修改物体的颜色
      const params = {
        color: '#ffff00',
        fn:() => {
          // 让立方体运动
          gsap.to(cube.position,{x: 5, duration:2, yoyo: true, repeat: -1});
        }
      }

       let folder = gui.addFolder('设置立方体');
      //颜色
      folder
        .addColor(params, "color")
        .onChange((value) => {
           cube.material.color.set(value);
        });
      //是否显示
      folder.add(cube, 'visible').name('是否显示');
      //点击按钮触发事件
      folder.add(params,'fn').name('立方体运动');

     
      folder.add(cube.material, 'wireframe');


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
