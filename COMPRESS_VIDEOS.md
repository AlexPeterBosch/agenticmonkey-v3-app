# Video Compression Commands

These videos exceed 1MB and should be compressed for production:

## platform-loop.mp4 (3,293 KB)
```bash
ffmpeg -i public/platform-loop.mp4 -c:v libx264 -crf 28 -preset slow -movflags +faststart -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" public/platform-loop-compressed.mp4
```

## mascot-intro.mp4 (1,742 KB)
```bash
ffmpeg -i public/mascot-intro.mp4 -c:v libx264 -crf 26 -preset slow -movflags +faststart -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" public/mascot-intro-compressed.mp4
```

## Notes
- `-crf 26-28`: Lower = better quality, higher = smaller file. 26 is good for hero content, 28 for background loops.
- `-preset slow`: Better compression ratio (use `medium` for faster encodes).
- `-movflags +faststart`: Moves metadata to start of file for faster streaming.
- `-an`: Strips audio (not needed for decorative videos).
- After verifying quality, replace originals:
  ```bash
  mv public/platform-loop-compressed.mp4 public/platform-loop.mp4
  mv public/mascot-intro-compressed.mp4 public/mascot-intro.mp4
  ```
