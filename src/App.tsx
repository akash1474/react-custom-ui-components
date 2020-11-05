import React from 'react';
import {Calendar} from 'react-custom-ui-components';

function App() {
  return (
  	<>
  		<Calendar onChange={(val)=>console.log(val)} />
  	</>
  );
}

export default App;
