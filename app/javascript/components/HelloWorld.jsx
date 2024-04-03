import React from "react";
import PropTypes from "prop-types";

const HelloWorld = (props) => {
  return (
    <React.Fragment>
      <div className="p-4 text-center tw-bg-blue-500 text-blue-300	">
        Hello, Tailwind!
      </div>
    </React.Fragment>
  );
};

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};

export default HelloWorld;
