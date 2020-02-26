import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const TabindexLoop = ({ children, className, disabled, selector }) => {
  const tabindexLoopRef = useRef(null);
  
  const getTabIndexChildren = () => {
    // find all focuseable elements within the ref element
    const focusableElements = tabindexLoopRef.current.querySelectorAll(selector)
    
    // trim off the first and last, because they are the start and end elements
    // filter out elements that are disabled or negative indexed
    return Array.prototype.slice.call(focusableElements, 1, -1).filter(node => !node.disabled && node.tabIndex > -1);
  }

  // if the start element receives focus
  // focus onto the last child element
  const handleFocusStart = e => {
    const tabindexChildren = getTabIndexChildren();
    tabindexChildren && tabindexChildren.length > 1 && tabindexChildren[tabindexChildren.length - 1].focus();
  };

  // if the end element receives focus
  // focus onto the first child element
  const handleFocusEnd = e => {
    const tabindexChildren = getTabIndexChildren();
    tabindexChildren && tabindexChildren.length > 1 && tabindexChildren[0].focus();
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
