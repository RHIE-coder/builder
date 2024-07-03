import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import common from '@rhiethereum-mix/common';

(async () => {
  console.log(common.add(10, 20));

  const data = {
    foo: 1,
    bar: 'abc',
  };

  if (common.validate(data)) {
    console.log('success');
    console.log(data.foo);
  } else {
    console.log('fail');
    console.log(common.validate.errors);
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
