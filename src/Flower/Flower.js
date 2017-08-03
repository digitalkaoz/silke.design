import React from 'react';

const Flower = props =>
  <div className="flower">
    {props.tl
      ? <div className="drop drop--tl">
          <span>
            {props.tl.name}
          </span>
        </div>
      : <div className="drop drop--none" />}
    {props.tr
      ? <div className="drop drop--tr">
          <span>
            {props.tr.name}
          </span>
        </div>
      : <div className="drop drop--none" />}
    {props.bl
      ? <div className="drop drop--bl">
          <span>
            {props.bl.name}
          </span>
        </div>
      : <div className="drop drop--none" />}
    {props.br ? <div className="drop drop--br drop--profile" /> : null}
  </div>;

export default Flower;
