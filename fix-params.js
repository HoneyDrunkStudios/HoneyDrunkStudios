const fs = require('fs');

// Fix nodes/[id]/page.tsx
const nodesFile = 'honeydrunk-website/app/nodes/[id]/page.tsx';
let nodesContent = fs.readFileSync(nodesFile, 'utf8');
nodesContent = nodesContent.replace(
  /export default function NodeDetailPage\(\{ params \}: \{ params: \{ id: string \} \}\) \{\r?\n  const node = getNodeById\(params\.id\);/,
  'export default async function NodeDetailPage({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params;\n  const node = getNodeById(id);'
);
fs.writeFileSync(nodesFile, nodesContent);
console.log('Fixed nodes/[id]/page.tsx');

// Fix services/[id]/page.tsx
const servicesFile = 'honeydrunk-website/app/services/[id]/page.tsx';
let servicesContent = fs.readFileSync(servicesFile, 'utf8');
servicesContent = servicesContent.replace(
  /export default function ServiceDetailPage\(\{ params \}: \{ params: \{ id: string \} \}\) \{\r?\n  const service = getServiceById\(params\.id\);/,
  'export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params;\n  const service = getServiceById(id);'
);
fs.writeFileSync(servicesFile, servicesContent);
console.log('Fixed services/[id]/page.tsx');
