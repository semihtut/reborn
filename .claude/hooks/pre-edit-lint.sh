#!/usr/bin/env bash
# Hook: PostToolUse — Dosya düzenlemesinden sonra lint çalıştır

FILE="$1"
EXIT_CODE=0

case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx)
    if command -v npx &> /dev/null; then
      npx eslint --fix "$FILE" 2>/dev/null || EXIT_CODE=$?
    fi
    ;;
  *.py)
    if command -v ruff &> /dev/null; then
      ruff check --fix "$FILE" 2>/dev/null || EXIT_CODE=$?
    fi
    ;;
esac

exit $EXIT_CODE
