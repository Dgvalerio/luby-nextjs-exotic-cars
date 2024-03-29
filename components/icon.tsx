import { FC } from 'react';

type iconName =
  | 'calendar'
  | 'map pin'
  | 'search'
  | 'arrow right'
  | 'arrow left'
  | 'chevron top';

const Icon: FC<{
  name: iconName;
  // eslint-disable-next-line react/require-default-props
  size?: number;
  width?: number;
  height?: number;
}> = ({ name, size, width, height }) => {
  let icon;
  switch (name) {
    case 'calendar':
      icon = (
        <g>
          <path
            className="a"
            d="M2,22.085a.943.943,0,0,0,.282.672.972.972,0,0,0,.682.278H19.036a.972.972,0,0,0,.682-.278A.943.943,0,0,0,20,22.085V11H2Zm12.857-9.66a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046h1.607a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H15.018a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm0,3.167a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046h1.607a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H15.018a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm-3.214-3.167a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046h1.607a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H11.8a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm0,3.167a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046h1.607a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H11.8a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm0,3.167a.157.157,0,0,1,.047-.112A.162.162,0,0,1,11.8,18.6h1.607a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H11.8a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112ZM8.429,15.592a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046H10.2a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H8.589a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm0,3.167a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046H10.2a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H8.589a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112ZM5.214,15.592a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046H6.982a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H5.375a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Zm0,3.167a.157.157,0,0,1,.047-.112.162.162,0,0,1,.114-.046H6.982a.162.162,0,0,1,.114.046.157.157,0,0,1,.047.112v1.584a.157.157,0,0,1-.047.112.162.162,0,0,1-.114.046H5.375a.162.162,0,0,1-.114-.046.157.157,0,0,1-.047-.112Z"
            transform="translate(0 -3.035)"
          />
          <path
            className="a"
            d="M19.036,3.326H16.789V2H14.86V3.326H7.14V2H5.211V3.326H2.964A.931.931,0,0,0,2.6,3.4a.955.955,0,0,0-.313.213.988.988,0,0,0-.209.32A1.012,1.012,0,0,0,2,4.31V6.639H20V4.31a1.011,1.011,0,0,0-.074-.379.987.987,0,0,0-.209-.32A.954.954,0,0,0,19.4,3.4a.931.931,0,0,0-.368-.073Z"
          />
        </g>
      );
      break;
    case 'map pin':
      icon = (
        <path
          d="M9.5,1.187A6.539,6.539,0,0,0,2.969,7.719c0,5.588,5.937,9.81,6.19,9.986a.6.6,0,0,0,.682,0c.253-.177,6.19-4.4,6.19-9.986A6.539,6.539,0,0,0,9.5,1.187Zm0,4.156a2.375,2.375,0,1,1-1.679.7,2.375,2.375,0,0,1,1.679-.7Z"
          transform="translate(-2.969 -1.187)"
        />
      );
      break;
    case 'search':
      icon = (
        <path
          className="a"
          d="M8.42,14.84a6.382,6.382,0,0,0,3.93-1.355l3.528,3.528,1.135-1.135L13.484,12.35A6.412,6.412,0,1,0,8.42,14.84ZM8.42,3.6A4.815,4.815,0,1,1,3.6,8.42,4.82,4.82,0,0,1,8.42,3.6Z"
        />
      );
      break;
    case 'arrow right':
      icon = (
        <g transform="translate(-768 -643.646)">
          <path d="M936-990h23.594" transform="translate(-168 1642)" />
          <path d="M952-998l8,8" transform="translate(-168.406 1642)" />
          <path
            d="M952-982.344l8.406-8.3"
            transform="translate(-168.406 1642.344)"
          />
        </g>
      );
      break;
    case 'arrow left':
      icon = (
        <g transform="translate(0.351 0.354)">
          <path
            className="a"
            d="M959.594-990H936"
            transform="translate(-935.594 998)"
          />
          <path
            className="a"
            d="M960-998l-8,8"
            transform="translate(-951.594 998)"
          />
          <path
            className="a"
            d="M960.406-982.344l-8.406-8.3"
            transform="translate(-952 998.344)"
          />
        </g>
      );
      break;
    case 'chevron top':
      icon = (
        <path
          d="M23.539,42.288a2.663,2.663,0,0,1-2.077-.985L8.6,25.323a2.663,2.663,0,0,1,0-3.382L21.915,5.961a2.667,2.667,0,0,1,4.1,3.409l-11.9,14.275L25.617,37.92a2.663,2.663,0,0,1-2.077,4.368Z"
          transform="translate(42.288 -7.992) rotate(90)"
        />
      );
      break;
    default:
      icon = (
        <path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z" />
      );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox={
        name === 'chevron top'
          ? '0 0 37.29 18.64'
          : `0 0 ${size || width} ${size || height}`
      }
    >
      {icon}
    </svg>
  );
};
Icon.defaultProps = {
  width: 16,
  height: 16,
};

export default Icon;
