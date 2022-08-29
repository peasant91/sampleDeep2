import React, { ComponentProps } from "react";
import { FlatList, View, ViewStyle } from "react-native";
import useLayout from "../../utils/useLayout";

interface Props {
  cols: number;
  spacing?: number;
  padding?: number;
}

export default function GridList({
                                   cols,
                                   renderItem,
                                   spacing = 0,
                                   padding = 0,
                                   ...rest
                                 }: Props & ComponentProps<typeof FlatList>) {
  const dataLength = rest.data?.length ?? 0;
  const allArray = Array.from(Array(dataLength).keys());
  const chunkedArray = chunk(allArray, cols);
  // const [listWidth, setListWidth] = useState(0);
  const [listSize, setListSize] = useLayout();

  function chunk(array: any[], chunk: number) {
    let result = [];
    for (let i = 0; i < array.length; i += chunk) {
      result.push(array.slice(i, i + chunk));
    }
    return result;
  }

  const marginStyle = (index?: number) => {
    if (index != undefined) {
      const styles: ViewStyle = {
        marginRight: spacing,
        marginBottom: spacing,
      };
      const isRightEdge = ((index + 1) % cols == 0);
      const isBottomEdge = [...chunkedArray[chunkedArray.length - 1]].includes(index);
      if (isRightEdge) {
        styles.marginRight = 0;
      }
      if (isBottomEdge) {
        styles.marginBottom = 0;
      }
      return styles;
    }
    return {};
  };

  // const padding = (rest.contentContainerStyle?.padding ?? 0) * 2;

  const childWidth = (((listSize.width - (spacing * (cols - 1))) / cols) - (padding * 2 / cols));

  const RenderItemWrapper = ({ children, index }: any) => {
    return <View style={[
      listSize.measured ?
        {
          width: childWidth,
        } : { flex: 1 }, marginStyle(index)]}>
      {children}
    </View>;
  };
  return (
    <>
      <FlatList
        onLayout={setListSize}
        numColumns={cols}
        renderItem={({ item, index }) => {
          return <>
            {
              listSize.measured &&
              <RenderItemWrapper index={index}>
                {
                  renderItem &&
                  <>
                    {
                      renderItem({ item, index })
                    }
                  </>
                }
              </RenderItemWrapper>
            }
          </>;
        }}
        contentContainerStyle={[
          rest?.contentContainerStyle,
          {
            padding: padding,
          }]}
        {...rest} />
    </>
  );
}
