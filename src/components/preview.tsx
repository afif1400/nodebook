import React, { useRef, useEffect } from 'react';
import '../styles/preview.css';

interface PreviewProps {
	code: string;
}

const html = `
<html lang="en">
<head>    
	<style>html {background:#fff;}</style>
</head>
<body>
  <div id="root"></div>
  <script>
	  const handleError = () =>{
			const root = document.querySelector('#root');
			root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>'
			console.error(err);
	  }

		window.addEventListener('error',(event) => {
			event.preventDefault();
			handleError(event.error)
		})
    window.addEventListener('message', (event) => {
      try{
        eval(event.data)
      }
      catch (err) {
        handleError(err)
      }
    },false)
  </script>
</body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcDoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className='preview-wrapper'>
			<iframe
				srcDoc={html}
				title='preview'
				ref={iframe}
				sandbox='allow-scripts'
			></iframe>
		</div>
	);
};

export default Preview;
