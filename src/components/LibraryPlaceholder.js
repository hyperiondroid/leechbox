import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const LibraryPlaceholderImpl = ({className, width = 214, height = 300, ...props}) => {

    const coverHeight = height
    const coverWidth = width
    const padding = 0
    const speed = 1
    const borderRadius = 8

    return (
      <div>
      <ContentLoader
        className =  {className}
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
      </div>
    )
  }

const LibraryPlaceholder = styled(LibraryPlaceholderImpl)`
  margin: 0.5em 1em;
  width: ${props=> props.width || 214}px;
`

export default LibraryPlaceholder