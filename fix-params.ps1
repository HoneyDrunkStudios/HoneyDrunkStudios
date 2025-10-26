$file = "honeydrunk-website/app/nodes/[id]/page.tsx"
$content = Get-Content $file -Raw
$content = $content -replace 'export default function NodeDetailPage\(\{ params \}: \{ params: \{ id: string \} \}\) \{(\r?\n)  const node = getNodeById\(params\.id\);', 'export default async function NodeDetailPage({ params }: { params: Promise<{ id: string }> }) {$1  const { id } = await params;$1  const node = getNodeById(id);'
Set-Content $file $content
Write-Host "Fixed nodes/[id]/page.tsx"

$file2 = "honeydrunk-website/app/services/[id]/page.tsx"
$content2 = Get-Content $file2 -Raw  
$content2 = $content2 -replace 'export default function ServiceDetailPage\(\{ params \}: \{ params: \{ id: string \} \}\) \{(\r?\n)  const service = getServiceById\(params\.id\);', 'export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {$1  const { id } = await params;$1  const service = getServiceById(id);'
Set-Content $file2 $content2
Write-Host "Fixed services/[id]/page.tsx"
