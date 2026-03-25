import Aurora from './Aurora';

const AURORA_STOPS: string[] = ['#1b1b1d', '#f1f4f0', '#3e3d3d'];

/** 1080×1080-style crop — open /aurora */
export default function AuroraSquarePage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-950 p-4">
      <div
        className="relative mx-auto overflow-hidden shadow-2xl shadow-black/50"
        style={{ width: '1080px', maxWidth: '100%', aspectRatio: '1' }}
      >
        <Aurora
          className="absolute inset-0 h-full w-full"
          colorStops={AURORA_STOPS}
          amplitude={1.7}
          blend={0.45}
        />
      </div>
    </main>
  );
}
