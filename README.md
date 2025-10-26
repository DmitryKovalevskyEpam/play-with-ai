
# - [Cursor AI: Полный гайд. Настройка, MCP, Vibe Coding, Deep Coding. 4 реальных проекта] https://www.youtube.com/watch?v=vBEpOuTDgWc


## Extension: 
- Live Server
- Open in Browser

## Prompts:
Напиши мне игру тетрис на HTML CSS & JavaScript .
Separate CSS, JavaScript and HTML to different files


```sh
npm create vite@latest
```


Создай мне из этого проекта todo приложение, где каждый элемент todo будет иметь свойства: title, completed, id. Нужно добавить возможность добавля1о новые элементы и фильтровать их. Для примера добавть 5 моковых элементов






































Here's how to configure codebase indexing settings in VS Code:

## 1. Search and Indexing Settings

Open VS Code settings (Ctrl+, or Cmd+,) and search for these key settings:

### Basic Indexing Settings
```json
{
  "search.followSymlinks": true,
  "search.useIgnoreFiles": true,
  "search.useGlobalIgnoreFiles": true,
  "search.useParentIgnoreFiles": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true,
    "**/dist": true,
    "**/build": true
  }
}
```

## 2. File Indexing Configuration

### Include/Exclude Files
```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/dist/**": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true
  }
}
```

## 3. Language-Specific Indexing

### For TypeScript/JavaScript
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.suggest.autoImports": true,
  "javascript.suggest.autoImports": true
}
```

### For Python
```json
{
  "python.analysis.indexing": true,
  "python.analysis.autoImportCompletions": true
}
```

## 4. Advanced Indexing Options

### Memory and Performance
```json
{
  "search.maxResults": 20000,
  "editor.largeFileOptimizations": true,
  "files.maxMemoryForLargeFilesMB": 4096
}
```

## 5. Workspace-Specific Settings

Create `.vscode/settings.json` in your project root:

```json
{
  "search.exclude": {
    "**/coverage": true,
    "**/temp": true,
    "**/test-results": true
  },
  "files.watcherExclude": {
    "**/large-assets/**": true,
    "**/cache/**": true
  }
}
```

## 6. Extension-Specific Indexing

### For C/C++
```json
{
  "C_Cpp.default.browse.path": [
    "${workspaceFolder}/**"
  ],
  "C_Cpp.autocomplete": "default"
}
```

### For Java
```json
{
  "java.configuration.updateBuildConfiguration": "automatic"
}
```

## 7. Troubleshooting Indexing Issues

### Reset Index
1. Open Command Palette (Ctrl+Shift+P)
2. Run "Developer: Reload Window"
3. Or run "File: Reopen Folder"

### Check Index Status
- Open Output panel (Ctrl+Shift+U)
- Select "TypeScript" or "Language Server" to see indexing progress

### Disable/Enable Extensions
If indexing is slow, try disabling language extensions temporarily.

## 8. Performance Tips

1. **Exclude large directories** from search indexing
2. **Use `.gitignore` patterns** - VS Code respects these by default
3. **Limit workspace size** - avoid opening very large folders
4. **Use workspace trust** - untrusted workspaces have limited indexing

## Example Complete Configuration

```json
{
  // Search and indexing
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/coverage": true,
    "**/.next": true,
    "**/out": true
  },
  
  // File watching
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/.git/objects/**": true
  },
  
  // Performance
  "search.maxResults": 10000,
  "editor.largeFileOptimizations": true,
  
  // Language specific
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "python.analysis.indexing": true
}
```

These settings will help optimize how VS Code indexes and searches through your codebase for better performance and accuracy.