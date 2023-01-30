import React, { useState } from "react";

function Popover() {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPopover(!showPopover)}>
        Show/Hide Popover
      </button>
      {showPopover && (
        <div className="popover">
          <p>This is the content of the popover.</p>
        </div>
      )}
    </div>
  );
}

export default Popover;
