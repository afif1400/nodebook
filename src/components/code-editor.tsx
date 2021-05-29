import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
	return (
		<div>
			<h1>Code Editor</h1>
			<MonacoEditor language='javascript' height='500px ' />
		</div>
	);
};

export default CodeEditor;
