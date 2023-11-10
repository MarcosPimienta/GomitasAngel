precision highp float;

// Varying
varying vec2 vUV;

// Uniforms
uniform float time;

void main() {
    float wave = sin(vUV.y * 10.0 + time);
    float gradient = smoothstep(0.4, 0.6, vUV.y + wave * 0.05);
    gl_FragColor = vec4(gradient, gradient, gradient, 1.0);
}
