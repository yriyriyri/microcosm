import VoxelEditor from "@/components/VoxelEditor/VoxelEditor";

export default async function EditorWorldPage({
  params,
}: {
  params: Promise<{ worldId: string }>;
}) {
  const { worldId } = await params;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <VoxelEditor initialWorldId={worldId} />
    </div>
  );
}