import React, { useState } from 'react'
import { Image, View } from 'react-native'

const SpriteImage = ({ source, data, name, style }) => {
    // 从图集的 JSON 中获取数据
    const { size, frames } = data
    
    // 按名称获取精灵图
    const frame = frames[name]
    const { x, y, width: frameWidth, height: frameHeight } = frame

    // 图片真实宽高与需渲染宽高的缩放比例
    const [scaleX, setScaleX] = useState(0)
    const [scaleY, setScaleY] = useState(0)
    const onLayout = ({ nativeEvent: { layout } }) => {
        const { width, height } = layout
        setScaleX(width / frameWidth)
        setScaleY(height / frameHeight)
    }

    // 缩放的锚点在中心，需要移动到左上角
    // -(1 - scaleX) * frameWidth / 2
    const translateX = (scaleX - 1) * frameWidth / 2
    const translateY = (scaleY - 1) * frameHeight / 2
    return (
        <View
            style={style}
            onLayout={onLayout}
        >
            <View
                style={{
                    width: frameWidth,
                    height: frameHeight,
                    overflow: 'hidden',
                    transform: [
                        { translateX },
                        { translateY },
                        { scaleX },
                        { scaleY },
                    ]
                }}
            >
                <Image
                    source={source}
                    style={{
                        resizeMode: 'cover',
                        width: size.width,
                        height: size.height,
                        transform: [
                            { translateX: -x, },
                            { translateY: -y }
                        ]
                    }}
                />
            </View>
        </View>
    )
}

export default SpriteImage
