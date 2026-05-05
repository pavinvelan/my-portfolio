"use client";
import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Color } from 'ogl';

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBaseColor;
  uniform vec3 uVaporColor;
  uniform float uSpeed;
  uniform float uSwirl;
  uniform float uIntensity;

  varying vec2 vUv;

  // --- Simplex Noise ---
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float ratio = uResolution.x / uResolution.y;
    vec2 pos = vec2(uv.x * ratio, uv.y);

    float t = uTime * uSpeed * 0.2;

    // --- SMOKY SWIRL MATH ---
    float angle = snoise(pos * 0.5 + t) * uSwirl;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 warpedPos = pos * rotation;

    // --- MULTI-LAYERED SMOKE ---
    float n1 = snoise(warpedPos - t);
    float n2 = snoise(warpedPos * 2.1 + n1 + (t * 0.5));
    float n3 = snoise(warpedPos * 4.0 - n2);

    // --- EROSION EFFECT ---
    float smokeMask = smoothstep(0.05, 0.55, n2 * n3);
    
    // Fade top and bottom
    smokeMask *= smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.6, uv.y);

    // Set to a medium mix factor for balanced visibility
    vec3 color = mix(uBaseColor, uVaporColor * 0.7, smokeMask);

    // --- THE "SILVER" GLINT ---
    float spec = pow(max(0.0, n2 * n3), 4.0) * uIntensity;
    color += spec * vec3(0.9, 0.95, 1.0); // Icy Silver highlights

    // Add film grain for a cinematic "carbon" texture
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.04;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const CarbonVapor = ({
    baseColor = "#050505",
    vaporColor = "#666666", // Medium gray
    speed = 0.5,
    swirl = 2.0,
    intensity = 1.7, // Medium intensity
}) => {
    const containerRef = useRef(null);
    const mousePos = useRef(new Vec2(0.5, 0.5));
    const targetMouse = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        if (!containerRef.current) return;
        const renderer = new Renderer({ alpha: true, antialias: true });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Vec2() },
                uMouse: { value: mousePos.current },
                uBaseColor: { value: new Color(baseColor) },
                uVaporColor: { value: new Color(vaporColor) },
                uSpeed: { value: speed },
                uSwirl: { value: swirl },
                uIntensity: { value: intensity },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            program.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e) => {
            targetMouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', onMouseMove);

        let requestId;
        const update = (t) => {
            requestId = requestAnimationFrame(update);
            mousePos.current.lerp(targetMouse.current, 0.05);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: mesh });
        };
        requestId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestId);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            if (containerRef.current?.contains(gl.canvas)) containerRef.current.removeChild(gl.canvas);
        };
    }, [baseColor, vaporColor, speed, swirl, intensity]);

    return <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none -z-10" />;
};

export default CarbonVapor;
