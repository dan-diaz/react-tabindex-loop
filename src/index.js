import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const TabindexLoop = ({ children, className, disabled, selector }) => {
  const tabindexLoopRef = useRef(null);

  const getNextFocusableChild = (startFromEnd) => {
    // find all focuseable elements within the ref element
    const focusableElements = tabindexLoopRef.current.querySelectorAll(selector);

    // trim off the start and end tab elements
    const trimmedList = Array.prototype.slice.call(focusableElements, 1, -1);

    // if we're looking for the last focusable child, start from the end
    startFromEnd && trimmedList.reverse();

    // find the first node that is actually focusable
    // elements in the dom may be disabled, negative tabindexed, or hidden, so we avoid those
    const focusableNode = trimmedList.find(node => {
      const computedStyle = window.getComputedStyle(node);
      const isFocusable =
        !node.disabled && node.tabIndex > -1 && !node.hidden &&
        computedStyle.visibility === 'visible' && // 'initial', 'inherit', and 'unset' values should all compute to 'visible'
        computedStyle.display !== 'none';

      return isFocusable;
    });

    return focusableNode;
  }

  // if the start element receives focus
  // focus onto the last child element
  const handleFocusStart = () => {
    const lastFocusableChild = getNextFocusableChild(true);
    lastFocusableChild && lastFocusableChild.focus();
  };

  // if the end element receives focus
  // focus onto the first child element
  const handleFocusEnd = () => {
    const firstFocusableChild = getNextFocusableChild();
    firstFocusableChild && firstFocusableChild.focus();
  };
  
  if (!children) {
    return null;
  }
  
  return (
    <div className={`tabindex-loop tabindex-loop--${disabled ? 'disabled' : 'enabled'} ${className}`} ref={tabindexLoopRef}>
      {!disabled && <div className='tabindex-loop__start' tabIndex='0' onFocus={handleFocusStart} />}
      {children}
      {!disabled && <div className='tabindex-loop__end' tabIndex='0' onFocus={handleFocusEnd} />}
    </div>
  );
};

TabindexLoop.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selector: PropTypes.string,
};

TabindexLoop.defaultProps = {
  disabled: false,
  selector: '[tabindex], a, button, input, select, textarea, iframe, [contentEditable=true], area',
};

export default TabindexLoop;
