import Mux from '@mux/mux-node';

const mux = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function createMuxUpload() {
  const mux = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
  );
  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      mp4_support: "standard",
    },
    cors_origin: process.env.NEXT_PUBLIC_URL!,
  });
  return upload;
}

export async function getMuxAsset(playbackId: string) {
  const mux = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
  );
  return mux.video.assets.find(playbackId);
}

