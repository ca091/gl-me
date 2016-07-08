- webgl流水线: 顶点着色器 - 图元装配 - 光栅化 - 片段着色器
- 顶点着色器变换处理 => (流水线) 图元装配 => 光栅化 => 片段着色 => 逐片段处理 => 作为像素保存到绘图缓冲
- 步骤: createShader - createProgram - createBuffer - 缓存链接着色器属性
- gl_Position: 保存顶点位置信息
```
片段着色器 内置特殊变量 :
gl_FragCoord
gl_FrontFacing
gl_PointCoord
=>
gl_FragColor
```

- 优先使用 gl.TRIANGLE_FAN gl.TRIANGLE_STRIP gl.drawElements
- 类型化数组: 二进制处理