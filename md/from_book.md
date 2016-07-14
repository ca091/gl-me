- 步骤: createShader - createProgram - createBuffer - 着色器属性绑定缓冲 - draw
- webgl流水线: 顶点着色器 - 图元装配 - 光栅化 - 片段着色器
- 顶点着色器变换处理 => (流水线) 图元装配 => 光栅化 => 片段着色 => 逐片段处理 => 作为像素保存到绘图缓冲

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
- 图元: gl.POINTS gl.LINES gl.TRIANGLES gl.LINE_STRIP gl.LINE_LOOP gl.TRIANGLE_FAN gl.TRIANGLE_STRIP

### 变换过程
- 对象坐标: 保存在buffer中的顶点初始坐标
- 模型变换:
```
用来确定模型在世界坐标系中的位置和方向 (平移, 旋转, 缩放) 顶点坐标 * mat4
```
- 世界坐标
- 视图变换: 照相机与对象的关系
```
用来确定对象在'虚拟'照相机中的位置和方向 (平移, 旋转) 对场景顶点的变换,照相机总是位于原点,不可变换
实现方式1: mat4.fromTranslation = function(out, v) + mat4.fromRotation = function(out, rad, axis)
实现方式2: mat4.lookAt = function (out, eye, center, up)
```
- 眼睛坐标 (模型变换与视图变换合并 => 模型视图变换 => 一个模型视图矩阵)
```
光照处理 通常在眼睛坐标系中进行
```
- 投影变换: 如何将3D场景投影到屏幕 (照相机的一个镜头)
```
正交投影: mat4.ortho = function (out, left, right, bottom, top, near, far)  (平行,长方体视域体)
透视投影: mat4.perspective = function (out, fovy, aspect, near, far)
     mat4.frustum = function (out, left, right, bottom, top, near, far)  (近大远小,视锥体)
```
- 裁剪坐标
- gl_Position: 保存顶点位置信息

### 如何看待变换
- 用固定的全局坐标系 实际顺序与代码调用顺序相反
- 用局部坐标系 实际顺序与代码调用顺序一致