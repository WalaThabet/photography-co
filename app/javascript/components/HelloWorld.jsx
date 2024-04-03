import React from "react"
import PropTypes from "prop-types"

const HelloWorld = (props) => {
  return (
    <React.Fragment>
     <h1 class="text-3xl font-bold underline">
         Hello world!
     </h1>
    </React.Fragment>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default HelloWorld
