(function () {
  const container = document.getElementById('hero3d');
  if (!container || typeof THREE === 'undefined') return;

  const labels = [
    { name: 'Web Applications', icon: '💻' },
    { name: 'Mobile Apps', icon: '📱' },
    { name: 'AI Solutions', icon: '🧠' },
    { name: 'Cloud Solutions', icon: '☁️' },
    { name: 'IoT Systems', icon: '🔌' },
    { name: 'Data & Analytics', icon: '📊' }
  ];

  let width = container.clientWidth || 560;
  let height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0.5, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // ----- lights -----
  scene.add(new THREE.AmbientLight(0x8899ff, 0.55));
  const l1 = new THREE.PointLight(0x3b82f6, 4, 25); l1.position.set(3.5, 3, 4); scene.add(l1);
  const l2 = new THREE.PointLight(0x7c3aed, 3, 25); l2.position.set(-3.5, -2, 3); scene.add(l2);
  const l3 = new THREE.PointLight(0x22d3ee, 2.5, 25); l3.position.set(0, -3, -3); scene.add(l3);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // ----- central engineered core (icosahedron + wireframe shell) -----
  const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.55,
    metalness: 0.75, roughness: 0.22, transparent: true, opacity: 0.92
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  rootGroup.add(core);

  const shellGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.32, 1));
  const shellMat = new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.5 });
  const shell = new THREE.LineSegments(shellGeo, shellMat);
  rootGroup.add(shell);

  // ----- tilted orbit ring with 6 nodes -----
  const ringGroup = new THREE.Group();
  ringGroup.rotation.x = THREE.MathUtils.degToRad(22);
  ringGroup.rotation.y = THREE.MathUtils.degToRad(-12);
  rootGroup.add(ringGroup);

  const radius = 2.65;
  const nodeMeshes = [];
  labels.forEach((l, i) => {
    const angle = (i / labels.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (i % 2 === 0 ? 0.35 : -0.35);

    const nodeGeo = new THREE.SphereGeometry(0.1, 20, 20);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x22d3ee, emissiveIntensity: 1.3 });
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(x, y, z);
    ringGroup.add(node);
    nodeMeshes.push(node);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 });
    ringGroup.add(new THREE.Line(lineGeo, lineMat));
  });

  // ----- ambient particle field -----
  const particleCount = 140;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x67e8f9, size: 0.02, transparent: true, opacity: 0.55 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ----- HTML label overlays (glass chips, same visual language as rest of site) -----
  const labelEls = labels.map(l => {
    const div = document.createElement('div');
    div.className = 'node-card node-card-3d';
    div.innerHTML = `<span class="ic">${l.icon}</span><b>${l.name}</b>`;
    container.appendChild(div);
    return div;
  });

  const centerLabel = document.createElement('div');
  centerLabel.className = 'core-label-3d';
  centerLabel.textContent = 'N';
  container.appendChild(centerLabel);

  const cubeWords = ['N', 'Web', 'App', 'AI', 'Data', 'Cloud', 'IoT'];
  let wordIdx = 0;
  setInterval(() => {
    wordIdx = (wordIdx + 1) % cubeWords.length;
    centerLabel.style.opacity = 0;
    setTimeout(() => {
      centerLabel.textContent = cubeWords[wordIdx];
      centerLabel.style.fontSize = cubeWords[wordIdx].length > 2 ? '20px' : '36px';
      centerLabel.style.opacity = 1;
    }, 250);
  }, 2200);

  // ----- mouse parallax -----
  let mouseX = 0, mouseY = 0;
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  container.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

  const vec = new THREE.Vector3();
  function project(mesh) {
    vec.copy(mesh.position);
    mesh.parent.localToWorld(vec);
    vec.project(camera);
    return {
      x: (vec.x * 0.5 + 0.5) * container.clientWidth,
      y: (-vec.y * 0.5 + 0.5) * container.clientHeight,
      z: vec.z
    };
  }

  let targetRotY = 0, targetRotX = 0;

  function animate() {
    requestAnimationFrame(animate);

    targetRotY += 0.0026;
    rootGroup.rotation.y += (targetRotY + mouseX * 0.35 - rootGroup.rotation.y) * 0.04;
    rootGroup.rotation.x += (mouseY * 0.22 - rootGroup.rotation.x) * 0.04;

    core.rotation.y -= 0.0022;
    core.rotation.x += 0.0008;
    shell.rotation.copy(core.rotation);

    particles.rotation.y += 0.00035;

    nodeMeshes.forEach((mesh, i) => {
      const p = project(mesh);
      const el = labelEls[i];
      el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      const depth = Math.max(0.35, 1 - (p.z + 1) / 2);
      el.style.opacity = depth;
      el.style.zIndex = Math.round(depth * 100);
    });

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    width = container.clientWidth; height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
