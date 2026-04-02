const NOTIFICATION_INTERVAL_MS = 30 * 60 * 1000; // 30 dakikada bir güncelle

let notificationTimer: ReturnType<typeof setInterval> | null = null;

export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function startFastingNotifications(startTime: Date, targetHours: number) {
  stopFastingNotifications();

  updateBadgeAndNotify(startTime, targetHours);

  notificationTimer = setInterval(() => {
    updateBadgeAndNotify(startTime, targetHours);
  }, NOTIFICATION_INTERVAL_MS);
}

export function stopFastingNotifications() {
  if (notificationTimer) {
    clearInterval(notificationTimer);
    notificationTimer = null;
  }
  clearBadge();
}

function updateBadgeAndNotify(startTime: Date, targetHours: number) {
  const elapsedMs = Date.now() - new Date(startTime).getTime();
  const elapsedHours = elapsedMs / 3600000;
  const remainingHours = Math.max(0, targetHours - elapsedHours);
  const remainingRounded = Math.ceil(remainingHours);

  // Badge API — uygulama ikonunda kalan saat
  updateBadge(remainingRounded);

  // Notification
  if (Notification.permission === "granted") {
    const progress = Math.min((elapsedHours / targetHours) * 100, 100).toFixed(0);

    if (remainingRounded <= 0) {
      showNotification("72 Saat Tamamlandı!", {
        body: "Tebrikler! Oruç hedefine ulaştın. Orucu yavaşça boz.",
        tag: "fasting-progress",
      });
    } else {
      const h = Math.floor(elapsedHours);
      const m = Math.floor((elapsedHours - h) * 60);
      showNotification(`${remainingRounded} saat kaldı`, {
        body: `Geçen süre: ${h}s ${m}dk — %${progress} tamamlandı`,
        tag: "fasting-progress",
      });
    }
  }
}

function showNotification(title: string, options: NotificationOptions) {
  try {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(`💧 ${title}`, {
          ...options,
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-192x192.png",
          silent: true,
        });
      });
    } else {
      new Notification(`💧 ${title}`, options);
    }
  } catch {
    // Notification failed silently
  }
}

function updateBadge(count: number) {
  try {
    if ("setAppBadge" in navigator) {
      if (count > 0) {
        (navigator as unknown as { setAppBadge: (n: number) => void }).setAppBadge(count);
      } else {
        (navigator as unknown as { clearAppBadge: () => void }).clearAppBadge();
      }
    }
  } catch {
    // Badge API not supported
  }
}

function clearBadge() {
  try {
    if ("clearAppBadge" in navigator) {
      (navigator as unknown as { clearAppBadge: () => void }).clearAppBadge();
    }
  } catch {
    // Badge API not supported
  }
}
