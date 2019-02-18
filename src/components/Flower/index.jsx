import React from 'react';
import "./Flower.scss";

const Flower = ({tl, tr, bl, br}) =>
  <div className="flower">
    {tl
      ? <div className="drop drop--tl">
          <span>
            {tl.name}
          </span>
        </div>
      : <div className="drop drop--tl drop--none" />}
    {tr
      ? <div className="drop drop--tr">
          <span>
            {tr.name}
          </span>
        </div>
      : <div className="drop drop--tr drop--none" />}
    {bl
      ? <div className="drop drop--bl">
          <span>
            {bl.name}
          </span>
        </div>
      : <div className="drop drop--bl drop--none" />}
    {br && !br.name
      ? <div className="drop drop--br drop--profile" />
      : <div className="drop drop--br drop--year">
          <span>
            {br.name}
          </span>
        </div>}
  </div>;

export default Flower;
