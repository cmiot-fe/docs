---
  layout: fe
  title: 设备云javascript书写规范
---

## 设备云javascript书写规范

### 函数和变量命名

命名必须匹配正则/^[_a-zA-Z]\w$/

必须采用驼峰式命名，如function pageManage `*`

类名首字母大写，如Dialog `*`

私有变量和私有函数使用"_"做前缀 `*`

全局变量用纯大写字母，用"_"做连接符，如IOT `*`

禁止在业务页面使用全局变量。需要使用全局变量的地方可以放到IOT命名空间，如IOT.deviveId `*`

jquery对象使用$做前缀，如$dom `*`

"_"已经保留，不能作为变量的命名

对象的key不能使用关键字或者保留字 `*`

### 关键字

"break", "case", "catch", "const", "continue", "default", "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "new", "return", "switch", "throw", "try", "typeof", "var", "void", "while", "with", "false", "true", "null", "undefined"

### 保留字

"abstract", "boolean", "byte", "char", "class", "debugger", "double", "enum", "export", "extends", "final", "float", "goto", "implements", "import", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "super", "synchronized", "throws", "transient", "volatile", "_"
