to deal
```
transform
texture
gl.drawArrays
gl.drawElements
图元
```
### Why is the attribute vec4 but gl.vertexAttribPointer size 3
-WebGL provides defaults for those you don't supply. The defaults are 0, 0, 0, 1 where x = 0, y = 0, z = 0 and w = 1
- 变换顺序: 模型变换 * 视图变换(相机) * 投影变换(透视)