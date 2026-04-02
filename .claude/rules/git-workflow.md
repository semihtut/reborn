# Git İş Akışı Kuralları

- Her özellik kendi branch'inde geliştirilsin: feature/kısa-açıklama
- Bug fix'ler: fix/kısa-açıklama
- Commit'ler atomik olsun — birden fazla mantıksal değişikliği tek commit'te birleştirme.
- Commit öncesi lint ve test geçtiğinden emin ol.
- Force push sadece kendi branch'ine — main/develop'a ASLA.
- Merge conflict'leri dikkatli çöz — otomatik birleştirmeye güvenme.
