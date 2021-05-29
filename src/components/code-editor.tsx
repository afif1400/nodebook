import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
	return (
		<div>
			<h1>Code Editor</h1>
			<MonacoEditor
				language='javascript'
				theme='vs-dark'
				height='500px'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 18,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
