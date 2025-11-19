import React from 'react';
import PropTypes from 'prop-types';

function ButtonPrimary({ href, target, label, icon, classes = "", download = false }) {
  const baseClasses = `btn btn-primary ${classes}`.trim();

  if (href) {
    return (
      <a 
        href={href}
        target={target}
        download={download} // 👈 only triggers if true
        className={baseClasses}
      >
        {label}
        {icon && (
          <span 
            className="material-symbols-outlined" 
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {label}
      {icon && (
        <span 
          className="material-symbols-outlined" 
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </button>
  );
}

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
  download: PropTypes.bool, // 👈 new prop
};


function ButtonOutline({ href, target, label, icon, classes = "" }) {
  const baseClasses = `btn btn-outline ${classes}`.trim();

  if (href) {
    return (
      <a href={href} target={target} className={baseClasses}>
        {label}
        {icon && (
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        )}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {label}
      {icon && (
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string,
};

export { ButtonPrimary, ButtonOutline };