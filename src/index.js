import { RedocStandalone } from 'redoc';
import ReactDOM from 'react-dom'
import React from 'react'

const App = () => {
    return <RedocStandalone
        specUrl="/swagger.json"
        options={{
            nativeScrollbars: true,
            theme: { colors: { primary: { main: '#dd5522' } } },
        }}
    />
}

const wrapper = document.getElementById("appRoot");
wrapper ? ReactDOM.render(<App />, wrapper) : false;