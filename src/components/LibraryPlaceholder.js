import React from 'react'
import ContentLoader from 'react-content-loader'

const LibraryPlaceholder = props => {

    const coverHeight = 300
    const coverWidth = 200
    const padding = 20
    const speed = 1
    const borderRadius = 8

    return (
      <ContentLoader
        speed={speed}
        backgroundColor='#232323'
        foregroundColor='#303030'
        width={coverWidth + padding}
        height={coverHeight + padding}
        {...props}
      >
        <rect
              x={0}
              y={0}
              rx={borderRadius}
              ry={borderRadius}
              width={coverWidth}
              height={coverHeight}
            />
      </ContentLoader>
    )
  }

export default LibraryPlaceholder