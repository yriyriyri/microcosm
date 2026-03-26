import VoxelViewer from "@/components/VoxelViewer/VoxelViewer";

export default async function PublishedWorldPage({
  params,
}: {
  params: Promise<{ publishedWorldId: string }>;
}) {
  const { publishedWorldId } = await params;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <VoxelViewer publishedWorldId={publishedWorldId} />
    </div>
  );
}