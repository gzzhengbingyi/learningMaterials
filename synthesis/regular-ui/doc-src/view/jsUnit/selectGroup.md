### 示例

#### 基本形式

<div class="m-example"></div>

```xml
<selectGroup source={source} depth=3 />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```

#### 禁用某一项，禁用组件

<div class="m-example"></div>

```xml
<p><selectGroup source={source} depth=3 /></p>
<p><selectGroup source={source} depth=3 disabled /></p>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', disabled: true, children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论', disabled: true},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程', disabled: true},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论', disabled: true},
                    {name: '车辆工程', disabled: true}
                ]}
            ]}
        ]
    }
});
```

#### 设置默认项

<div class="m-example"></div>

```xml
<selectGroup source={source} depth=3 placeholders={['学科门类', '一级学科', '二级学科']} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```

#### 远程数据

*待完成……*

#### 数据绑定

<div class="m-example"></div>

```xml
<selectGroup source={source} depth=3 on-select={this._onSelect($event)} />
<p>当前的选择项：{selectedTexts}</p>
<p>当前的选择值：{selectedValues}</p>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ],
        selecteds: []
    },
    _onSelect: function($event) {
        this.data.selectedTexts = $event.values.map(function(index, level) {
            var source = $event.sender.data.sources[level];
            var item = source && source[index];
            return item && item.name;
        }).join(' > ');

        this.data.selectedValues = $event.values.join(', ');
    }
});
```

#### 事件

请打开浏览器的控制台查看结果。

<div class="m-example"></div>

```xml
<selectGroup source={source} depth=3
    on-select={console.log('on-select:', '$event:', $event)}
    on-change={console.log('on-change:', '$event:', $event)} />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ]
    }
});
```

#### 行政区（部分）示例

该示例可以进行省市区三级的选择，并且处理了直辖市少一级的问题。

<div class="m-example"></div>

```xml
<selectGroup source={source} depth=3 on-select={this._onSelect($event)} ref="selectGroup" />
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        source: [
            {name: '北京', children: [
                {name: '北京', children: [
                    {name: '东城区'},
                    {name: '西城区'},
                    {name: '海淀区'},
                    {name: '朝阳区'},
                    {name: '丰台区'}
                ]}
            ]},
            {name: '上海', children: [
                {name: '上海', children: [
                    {name: '黄浦区'},
                    {name: '浦东新区'},
                    {name: '徐汇区'},
                    {name: '长宁区'}
                ]}
            ]},
            {name: '浙江', children: [
                {name: '杭州', children: [
                    {name: '上城区'},
                    {name: '下城区'},
                    {name: '江干区'},
                    {name: '西湖区'},
                    {name: '滨江区'}
                ]},
                {name: '宁波', children: [
                    {name: '海曙区'},
                    {name: '江东区'},
                    {name: '江北区'},
                    {name: '北仑区'},
                    {name: '镇海区'},
                    {name: '鄞州区'}
                ]},
                {name: '绍兴', children: [
                    {name: '越城区'},
                    {name: '柯桥区'},
                    {name: '上虞区'}
                ]}
            ]},
            {name: '江苏', children: [
                {name: '南京'},
                {name: '苏州'}
            ]}
        ]
    },
    _onSelect: function($event) {
        if($event.level === 0) {
            var selected = $event.selected;
            if(selected && (selected.name === '北京' || selected.name === '上海'))
                $event.sender.data.placeholders[1] = '';
            else
                $event.sender.data.placeholders[1] = '请选择';
        }
    }
});
```