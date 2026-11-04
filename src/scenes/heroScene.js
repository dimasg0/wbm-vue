/* WBM hero: 3D-сцена «переезд» — светлая версия в палитре сайта. Требует three.js r128. */
import * as THREE from 'three'
export function initHeroScene(box) {

  const R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap; R.outputEncoding = THREE.sRGBEncoding;
  R.setClearColor(0x000000, 0); box.appendChild(R.domElement);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, .1, 300);
  const TG = new THREE.Vector3(-.9, .9, .5), DIR = new THREE.Vector3(.448, .407, .797);
  function size() {
    const w = Math.max(box.clientWidth, 1), h = Math.max(box.clientHeight, 1), a = w / h, t = Math.tan(15 * Math.PI / 180);
    R.setSize(w, h); cam.aspect = a; const L = Math.max(9.2 / t, 12.6 / (t * a));
    cam.position.copy(TG).addScaledVector(DIR, L); cam.lookAt(TG); cam.updateProjectionMatrix(); R.render(scene, cam);
  }

  /* свет (дневной, мягкий) */
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfdcec, .62));
  const sun = new THREE.DirectionalLight(0xfff4e6, .62); sun.position.set(-6, 16, 12); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, far: 60 }); sun.shadow.bias = -.0005; sun.shadow.normalBias = .02; sun.shadow.radius = 3; scene.add(sun);
  const warm = new THREE.PointLight(0xffc98a, .9, 9, 2); warm.position.set(2.5, 2.4, .2); scene.add(warm);

  /* геометрия: скруглённые формы */
  function sm(g) {
    const p = g.attributes.position, n = g.attributes.normal, m = new Map(), k = i => p.getX(i).toFixed(3) + ',' + p.getY(i).toFixed(3) + ',' + p.getZ(i).toFixed(3);
    for (let i = 0; i < p.count; i++) { const q = k(i); let v = m.get(q); if (!v) { v = new THREE.Vector3(); m.set(q, v); } v.x += n.getX(i); v.y += n.getY(i); v.z += n.getZ(i); }
    for (let i = 0; i < p.count; i++) { const v = m.get(k(i)).clone().normalize(); n.setXYZ(i, v.x, v.y, v.z); } return g;
  }
  function RP(pts, r) {
    const s = new THREE.Shape(), n = pts.length; pts.forEach((q, i) => {
      const p0 = pts[(i + n - 1) % n], p2 = pts[(i + 1) % n], v = new THREE.Vector2(q[0], q[1]),
      a = new THREE.Vector2(p0[0], p0[1]).sub(v).setLength(r).add(v), b = new THREE.Vector2(p2[0], p2[1]).sub(v).setLength(r).add(v);
      i ? s.lineTo(a.x, a.y) : s.moveTo(a.x, a.y); s.quadraticCurveTo(v.x, v.y, b.x, b.y);
    }); s.closePath(); return s;
  }
  function EX(sh, d, b) { return sm(new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 4, curveSegments: 6 })); }
  function RB(w, h, d, r) { r = Math.min(r, w / 2 - .005, h / 2 - .005, d / 2 - .005); const a = w / 2 - r, c = d / 2 - r, g = EX(RP([[-a, -c], [a, -c], [a, c], [-a, c]], Math.max(Math.min(r, a, c) * .99, .001)), h - 2 * r, r); g.center(); g.rotateX(-Math.PI / 2); return g; }
  /* цвета задаём как в CSS (sRGB) — переводим в линейные, чтобы палитра совпадала с сайтом */
  const cc = h => new THREE.Color(h).convertSRGBToLinear();
  const M = (c, o) => { o = o || {}; const p = Object.assign({ color: cc(c), roughness: .75, metalness: 0 }, o); if (o.emissive !== undefined) p.emissive = cc(o.emissive); return new THREE.MeshStandardMaterial(p); };
  function P(w, h, d, r, x, y, z, m, par, ns) { const o = new THREE.Mesh(RB(w, h, d, r), m); o.position.set(x, y, z); o.castShadow = !ns; o.receiveShadow = true; (par || scene).add(o); return o; }
  function S(r, x, y, z, m, sx, sy, sz, par, cs) { const o = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), m); o.position.set(x, y, z); o.scale.set(sx || 1, sy || 1, sz || 1); o.castShadow = cs !== false; o.receiveShadow = true; (par || scene).add(o); return o; }
  const lamT = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); g.fillStyle = '#8a5a30'; g.fillRect(0, 0, 512, 512);
    for (let r = 0; r < 8; r++) { let x = -((r * 97) % 200); while (x < 512) { const w = 170 + Math.random() * 100, l = 55 + Math.random() * 10; g.fillStyle = 'hsl(' + (30 + Math.random() * 6) + ',52%,' + l + '%)'; g.fillRect(x, r * 64 + 1, w - 3, 62); x += w; } }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1.6, 1.2); t.anisotropy = 8; t.encoding = THREE.sRGBEncoding; return t;
  })();
  const glass = () => M(0x9cc4ff, { transparent: true, opacity: .22, roughness: .05, metalness: .3, depthWrite: false });
  const led = M(0xfff1d8, { emissive: 0xffb35c, emissiveIntensity: 1.1 });

  /* остров-диорама */
  const CX = -.6, CZ = .6, IR = 10.5, VX = -6.2, VZ = -.6;
  function lathe(pts, m) { const o = new THREE.Mesh(new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), 96), m); m.side = THREE.DoubleSide; o.position.set(CX, 0, CZ); o.receiveShadow = true; scene.add(o); }
  lathe([[IR + .14, -.5], [IR + .14, -.12], [IR, 0], [0, 0]], M(0xcfe5df, { roughness: 1 }));
  lathe([[0, -3.4], [IR * .45, -3.1], [IR * .8, -2.2], [IR + .14, -1], [IR + .14, -.5]], M(0x2a4f7d, { roughness: 1 }));
  /* дорога обрезана по кромке острова */
  {
    const rr = IR - .08, hw = 1.7, x0 = VX - hw, x1 = VX + hw, N = 14, dz = x => Math.sqrt(Math.max(rr * rr - (x - CX) * (x - CX), 0));
    const sh = new THREE.Shape(); sh.moveTo(x0, -(CZ - dz(x0))); sh.lineTo(x0, -(CZ + dz(x0)));
    for (let i = 1; i <= N; i++) { const x = x0 + (x1 - x0) * i / N; sh.lineTo(x, -(CZ + dz(x))); }
    sh.lineTo(x1, -(CZ - dz(x1))); for (let i = N - 1; i >= 1; i--) { const x = x0 + (x1 - x0) * i / N; sh.lineTo(x, -(CZ - dz(x))); } sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: .06, bevelEnabled: false }); g.rotateX(-Math.PI / 2);
    const rd = new THREE.Mesh(g, M(0x8f9db3, { roughness: 1 })); rd.receiveShadow = true; scene.add(rd);
    const dm = M(0xffffff, { roughness: .9 }); for (let z = CZ - 7.6; z <= CZ + 7.7; z += 1.6) { const d = new THREE.Mesh(new THREE.BoxGeometry(.14, .012, .7), dm); d.position.set(VX, .066, z); d.receiveShadow = true; scene.add(d); }
  }
  for (let i = 0; i < 4; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(.5, .55, .1, 16), M(0xdfe7f1, { roughness: .9 })); s.position.set(-1.9 - i * .85, .06, .1 + (i % 2) * .3); s.castShadow = s.receiveShadow = true; scene.add(s); }

  /* домик */
  const HX = 2.5, wall = M(0xf7f9fc, { roughness: .7 }), frame = M(0x163a63, { roughness: .5 }), wood = M(0xe2b27c, { roughness: .55 }), roofM = M(0x163a63, { roughness: .55, metalness: .05 });
  P(7.4, .3, 5.8, .1, HX, .15, 0, M(0xc3d0e0));
  { const f = new THREE.Mesh(new THREE.BoxGeometry(6.7, .05, 5.2), M(0xffffff, { map: lamT, roughness: .35 })); f.position.set(HX, .32, 0); f.receiveShadow = true; scene.add(f); }
  P(7, 2.7, .25, .08, HX, 1.65, -2.6, wall); P(.25, 2.7, 5.4, .08, 5.875, 1.65, 0, wall);
  P(.25, 2.7, 1, .06, -.875, 1.65, -2.2, wall); P(.25, 2.7, 1, .06, -.875, 1.65, 2.2, wall); P(.25, .6, 3.4, .06, -.875, 2.7, 0, wall);
  P(7, .5, .25, .06, HX, .55, 2.575, wall); P(7, .35, .25, .06, HX, 2.85, 2.575, frame);
  [-.875, 1, 2.5, 4, 5.875].forEach(x => P(.2, 2.3, .2, .06, x, 1.7, 2.575, frame));
  [[0, 1.75], [1.75, 1.5], [3.25, 1.5], [4.94, 1.75]].forEach(a => { const g = new THREE.Mesh(new THREE.BoxGeometry(a[1] - .1, 1.9, .04), glass()); g.position.set(-.875 + a[0] + a[1] / 2 + .05, 1.75, 2.575); scene.add(g); });
  P(.08, 2.2, 3, .04, 6.03, 1.5, -.5, wood); P(.08, 1.4, 2, .04, -.88, 1.2, -2.3, wood, null, true);
  { const sh = RP([[-3.75, 0], [3.75, 0], [0, 2.2]], .45), g = EX(sh, 7.2, .12); g.center(); g.rotateY(Math.PI / 2); const r = new THREE.Mesh(g, roofM); r.position.set(HX, 4.15, 0); r.castShadow = r.receiveShadow = true; scene.add(r); }
  P(.55, 1.4, .55, .12, 4.9, 4.6, -1.2, wall);
  P(8, .22, 2.4, .1, HX, .11, 3.9, M(0xe6c7a0)); P(2.4, .14, .7, .06, HX, .07, 5.4, M(0xe6c7a0));
  [-1.1, 6.1].forEach(x => { P(.14, .9, .14, .05, x, .65, 4.8, frame); S(.14, x, 1.2, 4.8, led, 1, 1, 1, null, false); });
  /* интерьер */
  const sofaM = M(0x4f7fb3, { roughness: .9 });
  P(3, .6, 1.1, .25, 3.8, .65, -1.8, sofaM); P(3, .8, .3, .14, 3.8, 1.05, -2.3, sofaM);
  const rug = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, .03, 32), M(0xe9eff7, { roughness: 1 })); rug.position.set(3.8, .36, .4); rug.receiveShadow = true; scene.add(rug);
  P(.06, 2, .06, .02, 5.3, 1.35, -1.2, frame); S(.24, 5.3, 2.45, -1.2, led, 1, 1, 1, null, false);
  P(.5, .5, .5, .18, 5.2, .6, 1.6, frame); S(.4, 5.2, 1.3, 1.6, M(0x58a58f), 1, 1.3, 1); S(.3, 5.45, 1.0, 1.75, M(0x6bb79f));
  S(.2, 2.3, 2.7, -.2, led, 1, 1, 1, null, false);
  /* раздвижные стеклянные двери дома */
  const hd = [-1, 1].map(() => { const g = new THREE.Mesh(new THREE.BoxGeometry(.06, 2.1, 1.75), M(0x9cc4ff, { transparent: true, opacity: .3, roughness: .05, metalness: .3, depthWrite: false })); g.position.set(-1.03, 1.4, 0); scene.add(g); return g; });

  /* фургон */
  const van = new THREE.Group(); van.rotation.y = -Math.PI / 2; van.position.set(VX, 0, 30); scene.add(van);
  const bodyM = M(0xffffff, { roughness: .4, metalness: .05 }), dark = M(0x163a63, { roughness: .4, metalness: .3 });
  {
    const g = EX(RP([[-3.3, .7], [-3.3, 1.55], [-2.5, 1.9], [-1.95, 2.85], [-1.2, 2.85], [-1.2, .7]], .3), 1.8, .12); const c = new THREE.Mesh(g, bodyM); c.position.z = -.9; c.castShadow = true; van.add(c);
    const w = new THREE.Mesh(EX(RP([[-2.55, 1.97], [-2.1, 2.72], [-1.3, 2.72], [-1.3, 1.97]], .12), 2.1, .04), M(0x1d3557, { roughness: .1, metalness: .6 })); w.position.z = -1.05; van.add(w);
  }
  P(7.4, .25, 2.1, .1, .45, .78, 0, dark, van);
  P(.12, 1.98, 2.2, .05, 4.05, 1.88, 0, bodyM, van); P(5.4, .14, 2.2, .07, 1.45, 2.86, 0, bodyM, van); P(5.3, 1.98, .12, .05, 1.4, 1.88, 1.05, bodyM, van);
  P(1, 1.98, .12, .05, -.7, 1.88, -1.05, bodyM, van); P(2.7, 1.98, .12, .05, 2.75, 1.88, -1.05, bodyM, van); P(1.7, .3, .12, .05, .6, 2.7, -1.05, bodyM, van);
  const logoM = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 256, 256); g.addColorStop(0, '#3b7bc4'); g.addColorStop(1, '#163a63');
    x.fillStyle = g; x.beginPath(); x.roundRect ? x.roundRect(8, 8, 240, 240, 64) : x.rect(8, 8, 240, 240); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 12; x.lineJoin = 'round'; x.lineCap = 'round';
    x.beginPath(); x.moveTo(78, 84); x.lineTo(128, 62); x.lineTo(178, 84); x.lineTo(178, 142); x.lineTo(128, 164); x.lineTo(78, 142); x.closePath(); x.moveTo(78, 84); x.lineTo(128, 106); x.lineTo(178, 84); x.moveTo(128, 106); x.lineTo(128, 164); x.stroke();
    x.fillStyle = '#fff'; x.font = '800 40px system-ui,sans-serif'; x.textAlign = 'center'; x.fillText('WBM', 128, 222);
    return new THREE.MeshBasicMaterial({ map: Object.assign(new THREE.CanvasTexture(c), { encoding: THREE.sRGBEncoding }), transparent: true });
  })();
  const doorG = new THREE.Group(); doorG.position.set(.6, 1.72, -1.15); van.add(doorG); P(1.6, 1.68, .1, .05, 0, 0, 0, bodyM, doorG);
  {
    const l = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), logoM); l.position.set(0, 0, -.06); l.rotation.y = Math.PI; doorG.add(l);
    const l2 = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), logoM); l2.position.set(1.4, 1.7, 1.12); van.add(l2);
    const rearLogo = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 1.18), logoM); rearLogo.position.set(4.125, 1.92, 0); rearLogo.rotation.y = Math.PI / 2; van.add(rearLogo);
  }
  const hl = M(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1.2 }), tl = M(0xd62839, { emissive: 0xd62839, emissiveIntensity: 1 });
  [-.65, .65].forEach(z => { P(.1, .2, .5, .08, -3.4, 1.2, z, hl, van, true); P(.08, .5, .16, .05, 4.15, 1.2, z * 1.3, tl, van, true); });
  const wheels = [];[-2.2, 3].forEach(x => [-1.05, 1.05].forEach(z => {
    const g = new THREE.Group(); g.position.set(x, .48, z); van.add(g);
    const t = new THREE.Mesh(new THREE.TorusGeometry(.34, .14, 12, 28), M(0x1f2937, { roughness: .9 })); t.castShadow = true; g.add(t);
    const r = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, .22, 20), M(0xdbe3ee, { metalness: .4, roughness: .3 })); r.rotation.x = Math.PI / 2; g.add(r);
    const h = new THREE.Mesh(new THREE.BoxGeometry(.4, .07, .26), M(0x7d8aa0)); g.add(h); wheels.push(g);
  }));

  /* лес, кусты, камни, цветы, фонари — всё внутри острова, ничего не перекрывает фонари */
  const gm = [0x6fa8a0, 0x86b9ae, 0x5a948f, 0x7db0a6].map(c => M(c, { roughness: .95 })), tr = M(0x9c7a5b, { roughness: .9 });
  function tree(x, z, s, t, mi) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); const m = gm[mi % 4];
    const k = new THREE.Mesh(new THREE.CylinderGeometry(.13, .2, 1.3, 8), tr); k.position.y = .65; k.castShadow = true; g.add(k);
    if (t) { S(1, 0, 2, 0, m, 1, 1.1, 1, g); S(.65, .6, 1.5, .2, m, 1, 1, 1, g); S(.6, -.6, 1.45, -.3, m, 1, 1, 1, g); }
    else { S(1.1, 0, 1.5, 0, m, 1, .8, 1, g); S(.85, 0, 2.4, 0, m, 1, .8, 1, g); S(.55, 0, 3.2, 0, m, 1, .85, 1, g); } scene.add(g);
  }
  [[-2.6, -6.6, 1.1, 1], [-.2, -7, 1.25, 0], [3, -6.9, 1.2, 1], [5.8, -5.3, 1.1, 0], [7.7, -2.6, .9, 0]].forEach((p, i) => tree(p[0], p[1], p[2], p[3], i));
  const bm = M(0x7fb3a8), rk = M(0xb8c4d6, { roughness: 1 });
  [[7.3, 3.8, .6], [-.6, -4.6, .5], [1.8, -4.4, .45], [6.9, -3.9, .55]].forEach(p => S(p[2], p[0], .4, p[1], bm, 1, .8, 1));
  [[-3, -4.3, .5], [8, 1, .55]].forEach(p => S(p[2], p[0], .15, p[1], rk, 1.2, .6, 1));
  const fl = [0xd62839, 0xffffff, 0xffd98a, 0x7fa8e0].map(c => M(c, { roughness: .8 }));
  [[-3.2, 6.4], [-1.8, 7.5], [.4, 7.2], [2, 8], [3.7, 7.3], [5.3, 7.9], [7, 6.4], [1, -4.8], [4.4, -4.9], [-1.6, -5.3], [8.4, 2.6], [-3.6, 3]].forEach((p, i) => S(.1, p[0], .1, p[1], fl[i % 4], 1, 1, 1, null, false));
  function lamp(x, z, h) { P(.12, h, .12, .04, x, h / 2, z, frame); S(.18, x, h + .12, z, led, 1, 1, 1, null, false); }
  lamp(-3.7, -2.9, 1.3); lamp(-3.7, 3.6, 1.3);

  /* коробки */
  const order = [[.2, -.3, 1], [.2, .6, 1], [1.05, -.3, 1], [1.9, .1, 1], [.2, -1.2, 0], [.2, -.3, 0], [.2, .6, 0], [1.05, -1.2, 0], [1.05, -.3, 0], [1.05, .6, 0], [1.05, 1.5, 0], [1.9, -.8, 0], [1.9, .1, 0], [2.75, -.3, 0]];
  const kraft = M(0xd7a46a, { roughness: .8 }), tape = M(0xf3e3bd, { roughness: .6 }), bg = RB(1, 1, 1, .14), tg = new THREE.BoxGeometry(1, 1, 1);
  const W = (l, y, z) => new THREE.Vector3(VX - z, y, van.position.z + l);
  const boxes = order.map((p, i) => {
    const g = new THREE.Group(), sx = .74 + ((i * 7) % 5) * .025, sz = .76 + ((i * 3) % 4) * .03;
    const m = new THREE.Mesh(bg, kraft); m.scale.set(sx, .8, sz); m.castShadow = m.receiveShadow = true; g.add(m);
    const a = new THREE.Mesh(tg, tape); a.scale.set(.13, .02, sz * .98); a.position.y = .405; g.add(a); scene.add(g);
    return { g, sx: p[0] + 0, sy: .74 + p[2] * .8, sz: p[1], ta: .4 + i * .12, tl: 6.4 + i * .5, lx: .45 + (i % 4) * .85, ly: 1.3 + Math.floor(i / 8) * .82, lz: -.5 + (Math.floor(i / 4) % 2) };
  });

  /* плавное появление/исчезновение фургона на кромке острова */
  const fadeM = [], bxM = [];
  const coll = (o, a) => o.traverse(n => { if (n.material) [].concat(n.material).forEach(m => { if (!a.some(e => e.m === m)) a.push({ m, o: m.opacity, t: m.transparent }); }); });
  coll(van, fadeM); boxes.forEach(b => coll(b.g, bxM));
  const setA = (a, k) => a.forEach(e => { e.m.opacity = e.o * k; e.m.transparent = k < 1 || e.t; });

  /* таймлайн */
  const T = 22, cl = v => Math.min(1, Math.max(0, v)), eo = u => 1 - Math.pow(1 - u, 3), eio = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, eb = u => { const c = 1.70158, d = c + 1; return 1 + d * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); };
  function upd(t) {
    let vz; if (t < 1.2) vz = 30; else if (t < 4.4) vz = 30 - (30 - VZ) * eo((t - 1.2) / 3.2); else if (t < 15.8) vz = VZ; else if (t < 19.4) { const u = (t - 15.8) / 3.6; vz = VZ - (VZ + 60) * u * u * u; } else vz = -60;
    van.position.z = vz; wheels.forEach(w => w.rotation.z = (30 - vz) / .48);
    const fa = t < 10 ? cl((13 - vz) / 7) : cl((vz + 11) / 7); van.visible = fa > .01; setA(fadeM, fa); setA(bxM, t < 10 ? 1 : fa);
    const ho = eio(cl((t - 4.6) / 1)) - eio(cl((t - 14.6) / .9)), vo = eio(cl((t - 5.2) / 1)) - eio(cl((t - 14.4) / .9));
    hd[0].position.z = -.875 - ho * 1.4; hd[1].position.z = .875 + ho * 1.4; doorG.position.x = .6 + vo * 2.3;
    boxes.forEach(b => {
      const g = b.g, D = 1.3;
      if (t < b.ta) { g.visible = false; return; } g.visible = true;
      if (t < b.tl) { const u = cl((t - b.ta) / .8), s = eb(u); g.scale.setScalar(Math.max(s, .001)); g.position.set(b.sx, b.sy + (1 - s) * 2.6, b.sz); g.rotation.set(0, (1 - u) * 1.2, 0); }
      else if (t < b.tl + D) {
        const s = (t - b.tl) / D, S0 = new THREE.Vector3(b.sx, b.sy, b.sz), Pd = W(.6, b.ly + .15, -1.8), Sw = W(b.lx, b.ly, b.lz); g.scale.setScalar(1);
        if (s < .75) { const u = s / .75, C = S0.clone().add(Pd).multiplyScalar(.5); C.y += 3.2; g.position.copy(S0.multiplyScalar((1 - u) * (1 - u)).add(C.multiplyScalar(2 * (1 - u) * u)).add(Pd.clone().multiplyScalar(u * u))); }
        else g.position.copy(Pd.lerp(Sw, eo((s - .75) / .25)));
        const k = s * s * (3 - 2 * s); g.rotation.set(0, -Math.PI * 2.5 * k, .45 * Math.sin(Math.PI * 2 * s));
      }
      else { const dt = t - b.tl - D, q = dt < .6 ? Math.exp(-dt * 6) * Math.sin(dt * 20) * .12 : 0; g.scale.set(1 + q * .5, 1 - q, 1 + q * .5); g.position.copy(W(b.lx, b.ly, b.lz)); g.rotation.set(0, -Math.PI / 2, 0); }
    });
    if (t >= 10 && fa <= .01) boxes.forEach(b => b.g.visible = false);
  }

  /* запуск: автономная анимация, пауза вне экрана, статичный кадр при reduced-motion */
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock(); let vis = true;
  // if ('IntersectionObserver' in window) new IntersectionObserver(e => { vis = e[0].isIntersecting; }).observe(box);

  let io;
  if ('IntersectionObserver' in window) { io = new IntersectionObserver(e => { vis = e[0].isIntersecting; }); io.observe(box); }

  if (reduce) upd(14.3);
  const ro = new ResizeObserver(size); ro.observe(box); size();
  let raf;
  (function loop() { raf = requestAnimationFrame(loop); if (!vis || reduce) return; upd(clock.getElapsedTime() % T); R.render(scene, cam); })();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    if (io) io.disconnect();
    R.dispose();
    R.domElement.remove();
  };
}