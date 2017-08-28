import React from 'react';

const Flower = props =>
  <div className="flower">
    {props.tl
      ? <div className="drop drop--tl">
          <span>
            {props.tl.name}
          </span>
        </div>
      : <div className="drop drop--tl drop--none" />}
    {props.tr
      ? <div className="drop drop--tr">
          <span>
            {props.tr.name}
          </span>
        </div>
      : <div className="drop drop--tr drop--none" />}
    {props.bl
      ? <div className="drop drop--bl">
          <span>
            {props.bl.name}
          </span>
        </div>
      : <div className="drop drop--bl drop--none" />}
    {props.br && !props.br.name
      ? <div className="drop drop--br drop--profile" />
      : <div className="drop drop--br drop--year">
          <span>
            {props.br.name}
          </span>
        </div>}
  </div>;

export default Flower;
