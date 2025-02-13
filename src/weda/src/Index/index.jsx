import * as React from 'react';
import {
  generateCompositeComponent,
  useComponentProps,
  reverseUseComponentProps
} from '@cloudbase/lowcode-render';
import { WdText as GsdH5ReactWdText } from '@cloudbase/weda-ui';
;


export default React.forwardRef((props, ref) => {
  const { events, $node, className, style, emit,$widget,compositeParent,isInComposite,forIndexes, data } = reverseUseComponentProps(props);
  const [compositeComponent, setcompositeComponent] = React.useState(null);

  const item = {"id":"$page","name":"$page","items":[{"id":"text1","type":"COMPLEX","component":"WdText","attributes":{"maxLines":"1","text":"文本内容","class":"block-text"},"directives":{":if":true},"extra":{"xIndex":0,"attributeExtraData":{}},"name":"index"}],"resources":[{"code":"\n  \n    /**\n     * 可以使用theme中定义的 mixin 和 定义变量\n     **/\n  \n.index-class-name {\n  \n  // 使用theme中的变量\n  // color: @example-primary-color;\n\n  // 默认 px 会转换成 rem，含大写字母 PX 和 Px 则不会转换\n  // margin-top: 20px;\n  // 使用theme中的混合（mixins）\n  // .mixins();\n  // 可写嵌套样式\n  .index-nest-class {\n    // color: #fff;\n    // 使用theme中的混合（mixins）\n    // .mixins(green);\n  }\n}\n\n/* @insert blocktemplate id: e78b98b9-0eaa-469e-96c8-22ac9412084b start */\n  .block-text {\n    color: red;\n  }\n/* @insert blocktemplate id: e78b98b9-0eaa-469e-96c8-22ac9412084b end */\n                  ","name":"style","path":"$comp/style","codeType":"style","type":"CODE"}],"data":{"properties":{}}};
  const componentsMap = {
    
    'gsd-h5-react:WdText': React.forwardRef((props,ref) => {
      const processedProps = useComponentProps(props, 1);
      return <GsdH5ReactWdText {...processedProps} ref={ref}/>
    }),
    
  };
  const componentActionsMap = {
    
  };

  const componentsInfoMap = {"gsd-h5-react:WdText":{"isComposite":false,"name":"WdText","title":"文本","platform":["H5","小程序"],"shortcut":{"props":["text","level"]},"emitEvents":[{"eventName":"tap","name":"点击"}],"dataForm":{"text":{"type":"string"},"level":{"type":"string"},"overflow":{"type":"boolean"},"maxLines":{"type":"string"},"tips":{"type":"boolean"},"space":{"type":"boolean"},"userSelect":{"type":"boolean"},"inheritColor":{"type":"boolean"}},"properties":{"type":"object","properties":{"id":{"type":"string","title":"组件 ID"},"module":{"type":"string","title":"组件库名"},"component":{"type":"string","title":"组件名"},"text":{"type":"string","title":"文本内容"},"level":{"type":"string","title":"文本格式"},"overflow":{"type":"boolean","title":"溢出省略"},"maxLines":{"type":"string","title":"最大行数"},"tips":{"type":"boolean","title":"展示文本气泡"},"space":{"type":"boolean","title":"连续空格"},"userSelect":{"type":"boolean","title":"是否可选中"}},"required":["text"]},"_version":"3.13.7"}}

  React.useEffect(() => {
    Promise.resolve(generateCompositeComponent({
        sourceKey: '',
        comp: item,
        module: 'block',
        componentsMap,
        componentActionsMap,
        componentsInfoMap,
        options: {
          enablePageRootId: false,
          lowcodeContext: {},
          looseError: true,
          processCssUnit: 'px',
          disablePageComponentInvoke: true,
        },
      }))
      .then((compositeComponent) => {
        setcompositeComponent(compositeComponent);
      });
  }, []);
  if (!compositeComponent) {
    return <></>;
  }
  const CompositeComponent = compositeComponent;

  return (
    <CompositeComponent
    events={events}
    $node={$node}
    $widget={$widget}
    compositeParent={compositeParent}
    isInComposite={isInComposite}
    forIndexes={forIndexes}
    className={className}
    style={style}
    data={data}
    ref={ref}
    emit={emit}
    ></CompositeComponent>
  );
});
