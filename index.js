import React from 'react'
import { Image, Platform, View } from 'react-native'

const resolveAssetSource = (source) => {
    // 使用 react-native-web-image-loader 插件
    // web 版解析的图片资源就是一个对象 { width, height, uri }
    if (Platform.OS === 'web') {
        return source
    }
    return Image.resolveAssetSource(source)
}

const SpriteImage = ({ source, data, name, width, height }) => {
    // 精灵图集大小
    const {
        width: sourceWidth,
        height: sourceHeight
    } = resolveAssetSource(source)
    // 精灵图集中该图片
    const { x, y, width: frameWidth, height: frameHeight } = data[name]
    // 图片真实宽高与需渲染宽高的缩放比例
    const scaleX = width / frameWidth
    const scaleY = height / frameHeight
    // 缩放的锚点在中心，需要移动到左上角
    // -(1 - scaleX) * frameWidth / 2
    const translateX = (scaleX - 1) * frameWidth / 2
    const translateY = (scaleY - 1) * frameHeight / 2
    return (
        <View style={{ width, height }}>
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
                        width: sourceWidth,
                        height: sourceHeight,
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
