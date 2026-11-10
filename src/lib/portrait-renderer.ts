// Browser-only renderer initialized by DesktopPortrait's effect, never at import time.
export function createPortraitRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!gl) return null;
  const vertex = `precision mediump float; attribute vec2 point; varying vec2 uv; uniform vec2 pose;
    void main() {
      uv=point/vec2(1291.,1218.);
      float weight=1.-smoothstep(710.,800.,point.y);
      float a=pose.x*.075; vec2 p=point-vec2(640.,700.);
      vec2 r=vec2(p.x*cos(a)-p.y*sin(a)+pose.x*32.-p.x*abs(pose.x)*.035-pose.x*.06*p.x*p.x/320.,
        p.x*sin(a)+p.y*cos(a)+pose.y*18.+p.y*pose.y*.025);
      vec2 dest=point+weight*(r-p);
      gl_Position=vec4(dest.x/1291.*2.-1.,1.-dest.y/1218.*2.,0.,1.);
    }`;
  const fragment = `precision mediump float; varying vec2 uv; uniform sampler2D art; uniform vec2 pose;
    void main() {
      vec2 p=uv*vec2(1291.,1218.); vec2 sampleUV=uv;
      // Inset eye apertures preserve the outer lids, frames and catchlights of the source.
      vec2 left=(p-vec2(546.,389.))/vec2(29.,10.);
      vec2 right=(p-vec2(734.,390.))/vec2(28.,10.);
      float mask=1.-smoothstep(.72,1.,min(dot(left,left),dot(right,right)));
      sampleUV-=mask*pose*vec2(14./1291.,6./1218.);
      vec4 color=texture2D(art,sampleUV); gl_FragColor=vec4(color.rgb*color.a,color.a);
    }`;
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); gl.deleteProgram(program); return null; }
    shaders.push(shader); gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const buffer = gl.createBuffer(), texture = gl.createTexture();
  if (!buffer || !texture) return null;
  const points: number[] = [], divisions = 48;
  for (let y = 0; y < divisions; y++) for (let x = 0; x < divisions; x++) {
    const x0 = x * 1291 / divisions, x1 = (x + 1) * 1291 / divisions;
    const y0 = y * 1218 / divisions, y1 = (y + 1) * 1218 / divisions;
    points.push(x0,y0,x1,y0,x0,y1,x0,y1,x1,y0,x1,y1);
  }
  gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, "point");
  gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  const poseUniform = gl.getUniformLocation(program, "pose");
  return {
    draw(pose: { x: number; y: number }) {
      gl.viewport(0, 0, canvas.width, canvas.height); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(poseUniform, pose.x, pose.y); gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
    },
    dispose() { gl.deleteTexture(texture); gl.deleteBuffer(buffer); shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); },
  };
}