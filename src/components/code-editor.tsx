import '../styles/code-editor.css';
import '../styles/syntax.css';
import { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
	initialValue: string;
	onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const [theme, setTheme] = useState('vs-dark');
	const editorRef = useRef<any>();

	// TODO: change the types of arguments in the handleChange functions

	// const handleCodeChange = (value: any, event: any) => {
	// 	console.log(value);
	// };
	//! instead of using this didmount onChange can also be used as newer version on @monaco-react
	//! to use onChange() - uncomment above handleCodeChange function and comment onMount in the
	//! monaco editor component
	const onEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;
		console.log(editor.getValue());
		editor.onDidChangeModelContent(() => {
			onChange(editor.getValue());
		});

		editor.getModel()?.updateOptions({ tabSize: 2 });

		const highlighter = new Highlighter(monaco, codeShift, editor);
		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		);
	};

	const onFormatClick = () => {
		// get the current value
		const unformated = editorRef.current.getModel().getValue();

		console.log(unformated);

		// formating
		const formated = prettier
			.format(unformated, {
				parser: 'babel',
				plugins: [parser],
				semi: true,
				singleQuote: true,
				useTabs: false,
			})
			.replace(/\n$/, '');

		// set fromated value back in the editor
		editorRef.current.setValue(formated);
	};

	return (
		<div className='editor-wrapper'>
			<button
				className='button button-format is-primary is-small'
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				onMount={onEditorDidMount}
				//? uncomment the below line and comment the above line
				//? to use onChnge event of the editor
				// onChange={handleCodeChange}
				value={initialValue}
				language='javascript'
				theme={theme}
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
