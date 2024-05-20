import React, { useEffect, useRef, useState, ReactNode } from "react";

const RotatableContainer = ({ children }: { children: ReactNode }) => {
  const [rotateGesture, setRotateGesture] = useState(false);
  const rotateBtnRef = useRef(null);
  const [origin, setOrigin] = useState();
  const [mouseOldPos, setMouseOldPos] = useState();
  const [rotation, setRotation] = useState(0);
  const rotatableElRef = useRef(null);

  const handleRotate = ({ mouseViewportX, mouseViewportY }) => {
    const angle1 = getAngle({
      x: mouseViewportX - origin.x,
      y: origin.y - mouseViewportY,
    });
    const angle2 = getAngle({
      x: mouseOldPos.x - origin.x,
      y: origin.y - mouseOldPos.y,
    });
    const delta = angle2 - angle1;
    setRotation(rotation + delta);
  };

  const onMouseMove = (event) => {
    const flags = event.buttons !== undefined ? event.buttons : event.which;
    const primaryMouseButtonDown = (flags & 1) === 1;
    const mouseViewportX = event.pageX - window.scrollX;
    const mouseViewportY = event.pageY - window.scrollY;
    setMouseOldPos({ x: mouseViewportX, y: mouseViewportY });

    if (primaryMouseButtonDown) {
      if (rotateGesture) {
        handleRotate({ mouseViewportX, mouseViewportY });
        return;
      }

      const insideRotate = isPointInsideElement(
        {
          x: mouseViewportX,
          y: mouseViewportY,
        },
        rotateBtnRef.current,
      );
      if (insideRotate) {
        setRotateGesture(true);
        return;
      }
    } else {
      setRotateGesture(false);
    }
  };

  useEffect(() => {
    const rect = rotatableElRef.current.getBoundingClientRect();
    setOrigin({
      x: rect.left - window.scrollX + rect.width / 2,
      y: rect.top - window.scrollY + rect.height / 2,
    });
  }, []);

  return (
    <section
      ref={rotateBtnRef}
      className="relative cursor-move border border-dashed border-pink-300"
    >
      <div className="flex" onMouseMove={onMouseMove} ref={rotatableElRef}>
        <div className="relative z-0" style={{ rotate: `${rotation}deg` }}>
          <div className="select-none" draggable={false}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

function isPointInsideElement(point, element) {
  const rect = element.getBoundingClientRect();
  return (
    point.x > rect.left &&
    point.x < rect.right &&
    point.y > rect.top &&
    point.y < rect.bottom
  );
}

function getAngle(point) {
  if (point.x < 0 && point.y > 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  if (point.x > 0 && point.y < 0) {
    return 360 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  if (point.x < 0 && point.y < 0) {
    return 180 + (Math.atan(point.y / point.x) * 180) / Math.PI;
  }
  return (Math.atan(point.y / point.x) * 180) / Math.PI;
}

export default RotatableContainer;
