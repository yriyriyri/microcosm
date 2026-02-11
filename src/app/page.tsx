import VoxelEditor from "@/components/VoxelEditor/VoxelEditor";
import { SoundProvider } from "@/components/VoxelEditor/audio/SoundProvider";

export default function Page() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <SoundProvider>
        <VoxelEditor />
      </SoundProvider>
    </main>
  );
}