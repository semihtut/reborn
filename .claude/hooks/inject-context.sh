#!/usr/bin/env bash
# Hook: UserPromptSubmit — Her mesaja otomatik bağlam ekle
# Kullanım: Claude Code hooks ayarlarında UserPromptSubmit olayına bağla

echo "=== Proje Durumu ==="
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'git yok')"
echo "Son commit: $(git log --oneline -1 2>/dev/null || echo 'yok')"
echo "Değişen dosyalar: $(git diff --name-only 2>/dev/null | head -5 || echo 'yok')"

# Son test sonucu varsa göster
if [[ -f ".last-test-result" ]]; then
  echo ""
  echo "=== Son Test Sonucu ==="
  tail -5 .last-test-result
fi
