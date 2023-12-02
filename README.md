# Gomitas Angel
![GomitasAngel02](https://github.com/MarcosPimienta/GomitasAngel/assets/60362847/8282eb8f-b86a-4d05-941f-90d7ca7ae17d)
![GomitasAngel00](https://github.com/MarcosPimienta/GomitasAngel/assets/60362847/568c5f58-6e0a-49b2-84c0-69789e115419)

## Description

This application is an interactive 3D scene developed using Vue.js and Babylon.js. It allows users to select different 'Ile' objects and play animations on 'Candy' objects in a 3D environment.

The main virtues of combining Vue.js and Babylon.js in this project include:
- Leveraging the simplicity and structure of Vue.js to build user interfaces in a component-based architecture.
- Utilizing Babylon.js to create rich 3D interactive experiences, including complex 3D graphics and animations.
- Employing Vue.js's reactivity system to automatically update the 3D scene when the underlying data changes.
- Providing an engaging user experience by combining a responsive user interface with an immersive 3D environment.
- Benefiting from the active community and rich ecosystem of plugins and resources for both Vue.js and Babylon.js.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Installation

Provide steps on how to install and run your application in the local environment.

```bash
# Clone the repository
git clone <https://github.com/MarcosPimienta/GomitasAngel.git>

# Navigate into the directory
cd <GomitasAngel>

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
## Usage
In this application, you can interact with a 3D box model. Use the mouse to orbit around the box. You can select 'Ile' objects by clicking on them.

To the left of the screen, there is a GUI made in Vue.js. This GUI includes arrow icons that you can click to control the selection of the 'Ile' box. It also includes radio buttons that allow you to control the 3D animations of the 'Candy' objects.

## Contributors
If you wish to contribute to this project, please fork this repository and submit a pull request.

- **Contributor Name** - [Abdel Baruc](https://github.com/Bhalut)
