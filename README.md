# aframe-3dmodel-viewer
This project helps in situations where you need to quickly place gltf / glb models into aframe scene

## Installation

```sh
git clone https://github.com/SnagiX/aframe-3dmodel-viewer.git
npm install
npm test
```

**Step by step:**

1. Copy this repository (with Github Desktop or `git clone https://github.com/SnagiX/aframe-3dmodel-viewer.git`, whatever you want)
2. Install all project's dependences: `npm install`
3. Add your models into `/models/` folder
4. Write `npm test` in the console. It turns local server on (`localhost:36364/`). To use it from another device, use https link (`https://localhost:36365/`)

Congradulations! Now you able to see simple web page with aframe scene, where your 3d models located.

**Advanced usage:**

You can change `app-config.json`, where are the main settings located.

## Notices

- Viewer supports .glb and .gltf extensions only. Of course, you may append other formats in `app-config.json`, but do it on your own risk.
- Using files with external textures and shaders may cause an error. Please convert complex scenes into .glb format (with `gltf-pipline` tool for example)

## Supported platforms

- PC
- Oculus Quest / Quest 2

Something mightn't work on other devices, so create an issue or make a commit into dev branch.

## Future plans

- WebAR support
- Full VR support

## License

MIT