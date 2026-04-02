# Güvenlik Kuralları

- Kullanıcı girdilerini HER ZAMAN sanitize et ve doğrula.
- SQL sorgularında parametreli sorgular kullan — string birleştirme ASLA.
- CORS ayarlarını açık yapılandır — wildcard (*) kullanma.
- Hassas veriler .env dosyasında tutulsun, ASLA kaynak kodda olmasın.
- Bağımlılıkları düzenli güncelle — bilinen açıkları takip et.
- Kullanıcı sağlık verisi hassas veridir — şifreli sakla.
- Kimlik doğrulama tokenları httpOnly, secure cookie'lerde taşınsın.
- Hata mesajlarında sistem detayı sızdırma — genel mesajlar kullan.
