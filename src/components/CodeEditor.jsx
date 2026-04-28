import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange }) {
  return (
    <Editor
      height="100%"
      defaultLanguage="c"
      language="c"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v ?? "")}
      options={{
        fontSize: 14,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        tabSize: 4,
        insertSpaces: true,
        automaticLayout: true,
        wordWrap: "on",
        bracketPairColorization: { enabled: true },
        renderLineHighlight: "all",
      }}
    />
  );
}
