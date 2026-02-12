import fs from 'fs';

const buf = fs.readFileSync('public/mascot.glb');

// GLB format: header (12 bytes) + chunks
// First chunk is JSON
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log('=== NODES ===');
if (gltf.nodes) {
  gltf.nodes.forEach((n, i) => {
    const info = [n.name || `node_${i}`];
    if (n.skin !== undefined) info.push('(SKINNED)');
    if (n.mesh !== undefined) info.push(`mesh:${n.mesh}`);
    if (n.children) info.push(`children:[${n.children}]`);
    console.log(info.join(' '));
  });
}

console.log('\n=== ANIMATIONS ===');
console.log(gltf.animations ? `${gltf.animations.length} animations` : 'NONE');
if (gltf.animations) {
  gltf.animations.forEach((a, i) => console.log(`  ${i}: ${a.name || 'unnamed'} (${a.channels?.length} channels)`));
}

console.log('\n=== SKINS ===');
console.log(gltf.skins ? `${gltf.skins.length} skins` : 'NONE');
if (gltf.skins) {
  gltf.skins.forEach((s, i) => console.log(`  ${i}: ${s.name || 'unnamed'} joints:${s.joints?.length}`));
}
