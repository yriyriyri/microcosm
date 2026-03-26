import VoxelEditor from "@/components/VoxelEditor/VoxelEditor";

export default function EditorWorldPage({
  params,
}: {
  params: { worldId: string };
}) {
  const { worldId } = params;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <VoxelEditor initialWorldId={worldId} />
    </div>
  );
}